// js/pyodide_worker.js
// Runs Pyodide in an isolated Web Worker thread with hard timeout kill support

importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

let pyodide = null;

async function init() {
  try {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
    });

    // Sandbox hardening: disallow DOM/JS bridge
    await pyodide.runPythonAsync(`
import sys
sys.modules['js'] = None
sys.modules['pyodide_js'] = None
`);

    pyodide.setStdout({
      batched: (str) => {
        postMessage({ type: 'stdout', text: str + '\n' });
      }
    });

    pyodide.setStderr({
      batched: (str) => {
        postMessage({ type: 'stderr', text: str + '\n' });
      }
    });

    postMessage({ type: 'ready' });
  } catch (err) {
    postMessage({ type: 'init_error', error: err.message });
  }
}

self.onmessage = async (e) => {
  const { type, code } = e.data;

  if (type === 'run') {
    if (!pyodide) {
      postMessage({ type: 'error', error: 'Python runtime is not ready yet.' });
      return;
    }

    try {
      if (code.includes('import numpy') || code.includes('from numpy')) {
        postMessage({ type: 'status', text: '📦 Loading NumPy...' });
        await pyodide.loadPackage('numpy');
      }

      const start = performance.now();
      await pyodide.runPythonAsync(code);
      const duration = (performance.now() - start).toFixed(1);

      postMessage({ type: 'done', duration });
    } catch (err) {
      postMessage({ type: 'error', error: err.message });
    }
  }
};

init();
