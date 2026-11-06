// js/daily_projects.js
// Provides tailored, simple & easy "Build from Scratch" daily revision projects for all 143 curriculum lessons.

function getDailyScratchProject(video, weekNum, weekGoal) {
  const t = (video.topics || '').toLowerCase();
  const rawTitle = (video.title || '').toLowerCase();

  let p = {
    title: '',
    time: '20 min',
    description: '',
    step1: '',
    step2: '',
    step3: '',
    weeklyGoal: weekGoal || 'Complete weekly curriculum milestone'
  };

  // 1. Python Basics & Core Flow (Weeks 1 - 3)
  if (t.includes('what is programming') || t.includes('installation') || t.includes('vs code setup')) {
    p.title = 'CLI Welcome & Python Runtime Inspector';
    p.description = 'Build a standalone script from scratch that detects your Python version with sys, asks for your name, and prints an ASCII welcome card.';
    p.step1 = 'Import sys and capture user name with input()';
    p.step2 = 'Query sys.version_info and format an ASCII greeting box';
    p.step3 = 'Print Python executable path and your 22-week commitment';
  } else if (t.includes('ecosystem') || t.includes('what python can do')) {
    p.title = 'AI & ML Ecosystem Capability Matrix';
    p.description = 'Write a Python dictionary mapping AI domains (Computer Vision, NLP, LLMs, MLOps) to standard libraries and print an interactive CLI menu.';
    p.step1 = 'Create a nested dictionary of AI domains and top Python libraries';
    p.step2 = 'Prompt user to select a domain (1-4)';
    p.step3 = 'Print matching tools, difficulty level, and a starter snippet';
  } else if (t.includes('modules') || t.includes('pip')) {
    p.title = 'Package Inspector & Pip Dependency Auditor';
    p.description = 'Create a script that tests if packages (like requests, numpy, math) are installed using try-except ImportError, logging their versions.';
    p.step1 = 'Define a list of core packages to check';
    p.step2 = 'Use importlib or try-except to attempt importing each package';
    p.step3 = 'Print a green/red checklist of installed modules with versions';
  } else if (t.includes('comments') || t.includes('escape sequences') || t.includes('sep=') || t.includes('end=')) {
    p.title = 'Terminal Receipt & Invoice Formatter';
    p.description = 'Design a clean store checkout receipt in terminal using escape characters (\\t, \\n), custom sep="|", and end="" formatting.';
    p.step1 = 'Define item prices, taxes, and customer name in variables';
    p.step2 = 'Format a multi-line ASCII invoice with borders and tab stops';
    p.step3 = 'Print subtotal, tax calculation, and formatted grand total';
  } else if (t.includes('variables') || t.includes('data types') || t.includes('type casting')) {
    p.title = 'Student Grade & GPA Calculator';
    p.description = 'Capture marks across 5 subjects as user strings, cast them to floats, calculate aggregate percentage, and print GPA with formatted f-strings.';
    p.step1 = 'Ask user for marks in 5 subjects with input() and cast to float()';
    p.step2 = 'Compute sum, average percentage, and round to 2 decimals';
    p.step3 = 'Print clean summary card using formatted f-strings and type checks';
  } else if (t.includes('calculator') || t.includes('operators')) {
    p.title = 'Interactive Math & EMI Loan Calculator';
    p.description = 'Build a terminal calculator that computes monthly loan EMI using the mathematical formula P * r * (1+r)^n / ((1+r)^n - 1).';
    p.step1 = 'Take Principal (P), Annual Rate (R), and Tenure in years (N)';
    p.step2 = 'Convert annual rate to monthly rate r = R/(12*100) and n = N*12';
    p.step3 = 'Compute EMI, total repayment, total interest, and format neatly';
  } else if (t.includes('string') && (t.includes('slice') || t.includes('indexing') || t.includes('negative'))) {
    p.title = 'Secret Word Scrambler & Palindrome Tester';
    p.description = 'Build a text utility that reverses strings using slice notation [::-1], checks for palindromes, and creates masked passwords.';
    p.step1 = 'Prompt user for a phrase or password string';
    p.step2 = 'Check phrase === phrase[::-1] ignoring whitespace and casing';
    p.step3 = 'Output whether it is a palindrome and print masked middle characters';
  } else if (t.includes('string methods') || t.includes('strip()') || t.includes('replace()')) {
    p.title = 'Blog Slug & URL Sanitizer';
    p.description = 'Build a text cleaner that takes a blog post title, strips punctuation, replaces spaces with hyphens, and outputs a clean URL slug.';
    p.step1 = 'Take raw title: e.g. "  Deep Learning in 2026: 5 Key Tips!  "';
    p.step2 = 'Apply .strip(), .lower(), .replace(), and remove special characters';
    p.step3 = 'Print validated SEO slug: "deep-learning-in-2026-5-key-tips"';
  } else if (t.includes('if-else') || t.includes('conditional') || t.includes('match case')) {
    p.title = 'Interactive ATM Banking & PIN Validator';
    p.description = 'Create a secure terminal ATM simulator with balance check, withdrawal limits, and PIN verification using nested if-elif-else.';
    p.step1 = 'Set starting balance ($1000) and correct PIN (4 digits)';
    p.step2 = 'Validate PIN attempts (max 3), then handle Deposit / Withdraw branches';
    p.step3 = 'Ensure withdrawal does not exceed balance; print updated receipt';
  } else if (t.includes('for loop') || t.includes('while loop') || t.includes('break') || t.includes('continue')) {
    p.title = 'Prime Number Filter & Multiplication Matrix';
    p.description = 'Use nested loops and break/continue to build an interactive number analyzer that flags prime numbers and draws multiplication grids.';
    p.step1 = 'Ask user for an integer N (e.g. 1 to 50)';
    p.step2 = 'Iterate with for-loop and modulo operator to test divisibility';
    p.step3 = 'Print list of all primes up to N and count total loop iterations';
  } else if (t.includes('list') || t.includes('tuple')) {
    p.title = 'Daily Study Task Manager & Priority Queue';
    p.description = 'Implement an in-memory task list CLI where you can append tasks, pop completed tasks, sort by priority, and slice top 3 goals.';
    p.step1 = 'Store tasks as tuples (priority, title) in a Python list';
    p.step2 = 'Allow adding new items, sorting by priority (1 to 5), and removing';
    p.step3 = 'Print neatly numbered daily checklist with completion summary';
  } else if (t.includes('dict') || t.includes('set') || t.includes('hashmap')) {
    p.title = 'Text Vocabulary & Word Frequency Counter';
    p.description = 'Build a text analytics tool that cleans raw paragraphs, uses sets to find unique words, and counts occurrences using a dictionary.';
    p.step1 = 'Read a multi-line string input or sample article text';
    p.step2 = 'Split into words, strip punctuation, convert to lowercase, build frequency dict';
    p.step3 = 'Print total word count, unique vocabulary size, and top-5 frequent words';
  } else if (t.includes('function') || t.includes('args') || t.includes('kwargs') || t.includes('lambda')) {
    p.title = 'Modular Scientific Unit Converter';
    p.description = 'Write pure functions with docstrings, default arguments, and *args to convert temperatures, storage units (GB to TB), and currencies.';
    p.step1 = 'Define clean functions: celsius_to_fahrenheit, bytes_to_human, etc.';
    p.step2 = 'Add input validation and optional rounding precision argument';
    p.step3 = 'Build an interactive menu loop invoking the functions';
  } else if (t.includes('file') || t.includes('open()') || t.includes('read') || t.includes('write')) {
    p.title = 'Markdown Reflection Journal & Note Appender';
    p.description = 'Build a file I/O logger that appends daily timestamps, doubts, and lessons into a local study_notes.md file with search functionality.';
    p.step1 = 'Open "study_journal.txt" in append mode ("a") with UTF-8 encoding';
    p.step2 = 'Write timestamp, topic name, and 2-sentence reflection';
    p.step3 = 'Open file in read mode ("r") and search for specific topic keywords';
  } else if (t.includes('class') || t.includes('oop') || t.includes('object') || t.includes('constructor') || t.includes('self')) {
    p.title = 'Bank Account & Transaction Ledger Class';
    p.description = 'Create a BankAccount class with __init__, deposit(), withdraw(), and a private ledger list logging all transaction timestamps.';
    p.step1 = 'Define BankAccount with holder_name and starting balance';
    p.step2 = 'Implement deposit() and withdraw() methods with balance check';
    p.step3 = 'Add a get_statement() method printing formatted transaction history';
  } else if (t.includes('inheritance') || t.includes('polymorphism') || t.includes('dunder') || t.includes('magic methods')) {
    p.title = '2D Vector Math Engine with Dunder Overloading';
    p.description = 'Build a Vector2D class that overloads __add__, __sub__, __mul__, and __repr__ to perform natural vector algebra: v1 + v2 and v1 * scalar.';
    p.step1 = 'Create Vector2D(x, y) class storing float coordinates';
    p.step2 = 'Implement __add__ for vector addition and __mul__ for scalar multiplication';
    p.step3 = 'Implement magnitude() and dot_product() methods; test with assertions';

  // 2. Data Engineering: NumPy, Pandas, SQL (Weeks 4 - 6)
  } else if (t.includes('numpy') || t.includes('ndarray') || t.includes('broadcasting')) {
    p.title = 'NumPy Matrix Normalization & Vector Math Sandbox';
    p.description = 'Create a synthetic feature matrix with np.random, compute MinMax and Z-score normalization, and calculate pairwise Euclidean distance.';
    p.step1 = 'Generate 10x4 random feature matrix with np.random.randn';
    p.step2 = 'Calculate mean and std along axis=0; compute Z-score: (X - mean) / std';
    p.step3 = 'Calculate Euclidean distance between row 0 and all other rows using np.linalg.norm';
  } else if (t.includes('pandas') || t.includes('dataframe') || t.includes('series')) {
    p.title = 'Pandas CSV Data Cleaner & Missing Value Imputer';
    p.description = 'Load a synthetic dataset, inspect .info() and .describe(), filter rows with boolean indexing, and impute missing numerical values with median.';
    p.step1 = 'Create a synthetic customer DataFrame with null values';
    p.step2 = 'Inspect .isna().sum(), fill missing numerical values with .fillna(df.median())';
    p.step3 = 'Group by category using .groupby() and compute mean metrics';
  } else if (t.includes('sql') || t.includes('select') || t.includes('join') || t.includes('groupby')) {
    p.title = 'In-Memory SQLite Customer Database & Analytics Queries';
    p.description = 'Use Python\'s built-in sqlite3 module to create Users and Orders tables, insert 10 sample records, and write an INNER JOIN with GROUP BY.';
    p.step1 = 'Connect to sqlite3.connect(":memory:") and create users & orders tables';
    p.step2 = 'Insert sample purchase records across 3 customers';
    p.step3 = 'Execute SQL query calculating total revenue per customer and print table';
  } else if (t.includes('matplotlib') || t.includes('seaborn') || t.includes('plot') || t.includes('visualization')) {
    p.title = 'Model Training Loss & Confusion Matrix Visualizer';
    p.description = 'Use Matplotlib to plot simulated training vs validation loss curves across 50 epochs, and use Seaborn to draw an annotated heatmap.';
    p.step1 = 'Generate simulated exponential decay loss curves with NumPy';
    p.step2 = 'Plot train and validation loss with labels, legend, and grid';
    p.step3 = 'Save plot as "training_curve.png" and display summary metrics';
  } else if (t.includes('gradient descent') || t.includes('calculus') || t.includes('derivative') || t.includes('loss')) {
    p.title = 'Pure NumPy Batch Gradient Descent for y = mx + c';
    p.description = 'Implement batch gradient descent from first principles without scikit-learn: compute derivative of MSE loss and update slope and intercept.';
    p.step1 = 'Generate synthetic noisy linear data points: y = 3x + 4 + noise';
    p.step2 = 'Loop 100 epochs: calculate predictions, compute loss, update m and c using lr * grad';
    p.step3 = 'Print final learned slope/intercept and verify convergence to true values';

  // 3. Classical Machine Learning & Scikit-Learn (Weeks 7 - 10)
  } else if (t.includes('linear regression') || t.includes('ols') || t.includes('r2 score')) {
    p.title = 'House Price Predictor with Scikit-Learn & R2 Score';
    p.description = 'Train a Linear Regression model on housing features, evaluate Train/Test split, and compute Mean Squared Error and R2 score.';
    p.step1 = 'Load synthetic house data (SquareFeet, Bedrooms) using pandas';
    p.step2 = 'Fit LinearRegression() model on 80% train split';
    p.step3 = 'Predict on test set and print R2 score and model coefficients';
  } else if (t.includes('logistic regression') || t.includes('classification') || t.includes('confusion matrix')) {
    p.title = 'Customer Churn Logistic Classifier & ROC Curve';
    p.description = 'Train a Logistic Regression classifier, output class probabilities with .predict_proba(), and print classification report with Precision & Recall.';
    p.step1 = 'Load binary classification dataset (churn vs retain)';
    p.step2 = 'Fit LogisticRegression() with StandardScaler preprocessing';
    p.step3 = 'Display confusion matrix and plot ROC curve with AUC metric';
  } else if (t.includes('decision tree') || t.includes('random forest') || t.includes('xgboost')) {
    p.title = 'Ensemble Churn Predictor: Random Forest vs XGBoost';
    p.description = 'Train a Random Forest classifier and an XGBoost model on tabular data, compare accuracy, and extract feature importances.';
    p.step1 = 'Split dataset into X_train, X_test, y_train, y_test';
    p.step2 = 'Train RandomForestClassifier and XGBClassifier models';
    p.step3 = 'Print top-5 most important features for decision making';
  } else if (t.includes('pipeline') || t.includes('columntransformer') || t.includes('hyperparameter') || t.includes('gridsearch')) {
    p.title = 'Production Scikit-Learn Pipeline with Joblib Export';
    p.description = 'Build a unified Pipeline chaining SimpleImputer, OneHotEncoder, StandardScaler, and a Classifier, then serialize to disk with joblib.';
    p.step1 = 'Construct ColumnTransformer for numerical and categorical columns';
    p.step2 = 'Wrap into Pipeline([("preprocessor", pre), ("model", clf)])';
    p.step3 = 'Fit pipeline, evaluate test accuracy, and save as model.joblib';

  // 4. MLOps, APIs, Docker & Databases (Weeks 11 - 14)
  } else if (t.includes('fastapi') || t.includes('rest') || t.includes('http') || t.includes('pydantic')) {
    p.title = 'FastAPI Model Inference Endpoint with Pydantic Validation';
    p.description = 'Scaffold a production FastAPI server with POST /predict endpoint, request schema validation using Pydantic, and automatic Swagger docs.';
    p.step1 = 'Define InputFeatures(BaseModel) with typed fields and range validators';
    p.step2 = 'Create @app.post("/predict") route that runs inference logic and logs latency';
    p.step3 = 'Test endpoint using Swagger UI at /docs and verify validation error handling';
  } else if (t.includes('docker') || t.includes('container') || t.includes('dockerfile')) {
    p.title = 'Containerized FastAPI Microservice with Dockerfile';
    p.description = 'Write a multi-stage Dockerfile packaging Python runtime, FastAPI dependencies, and model weights into an isolated Docker container.';
    p.step1 = 'Create Dockerfile using python:3.11-slim base image';
    p.step2 = 'Copy requirements.txt, install dependencies, and set non-root user';
    p.step3 = 'Build image and test container run: docker run -p 8000:8000 ai-api';
  } else if (t.includes('redis') || t.includes('cache') || t.includes('jwt') || t.includes('auth')) {
    p.title = 'In-Memory Prediction Caching Layer with Redis / Hashmap';
    p.description = 'Implement a high-speed caching decorator that checks if identical model input features were predicted previously, returning cached results in <1ms.';
    p.step1 = 'Hash input feature vectors with hashlib.sha256()';
    p.step2 = 'Check cache key in Redis (or in-memory dict); return if hit';
    p.step3 = 'If cache miss, run model inference and store in cache with 10-min TTL';

  // 5. Deep Learning & PyTorch (Weeks 15 - 16)
  } else if (t.includes('pytorch') || t.includes('tensor') || t.includes('autograd')) {
    p.title = 'PyTorch Autograd & Feed-Forward MLP from Scratch';
    p.description = 'Create PyTorch tensors on GPU/CPU, construct a 2-layer Neural Network with nn.Linear and ReLU, compute loss, and run loss.backward().';
    p.step1 = 'Define custom nn.Module with 2 linear layers and ReLU activation';
    p.step2 = 'Generate synthetic binary classification data and define Adam optimizer';
    p.step3 = 'Train for 20 epochs, printing loss reduction and parameter gradients';
  } else if (t.includes('convolution') || t.includes('cnn') || t.includes('computer vision')) {
    p.title = '2D Convolutional Image Filter & Edge Detector';
    p.description = 'Implement a 2D convolution kernel (Sobel filter for edge detection) in PyTorch using nn.Conv2d to filter image patterns.';
    p.step1 = 'Load or generate a sample grayscale image tensor (1, 1, H, W)';
    p.step2 = 'Define Sobel horizontal and vertical 3x3 weight kernels';
    p.step3 = 'Pass tensor through Conv2d and print feature map activations';

  // 6. Generative AI, RAG, Vector Search & LLMs (Weeks 17 - 22)
  } else if (t.includes('vector') || t.includes('embedding') || t.includes('cosine') || t.includes('ann') || t.includes('hnsw')) {
    p.title = 'In-Memory Vector Search Engine & Cosine Retriever';
    p.description = 'Build a zero-dependency in-memory vector index that encodes text chunks into embeddings and retrieves the top-k most relevant chunks.';
    p.step1 = 'Define 6 knowledge base text snippets and compute embeddings';
    p.step2 = 'Implement cosine similarity: dot(q, d) / (norm(q) * norm(d))';
    p.step3 = 'Query with a question and return the top-2 closest matching chunks';
  } else if (t.includes('rag') || t.includes('chunk') || t.includes('document')) {
    p.title = 'Mini Document Chunker & Context-Augmented Prompt Generator';
    p.description = 'Implement a recursive character text splitter with chunk_size and chunk_overlap, then assemble a prompt with retrieved context.';
    p.step1 = 'Load raw text document and split into 200-character overlapping chunks';
    p.step2 = 'Find most relevant chunk for a user query via keyword/vector match';
    p.step3 = 'Inject retrieved chunk into prompt: "Answer using only this context: {chunk}"';
  } else if (t.includes('attention') || t.includes('transformer') || t.includes('multi-head')) {
    p.title = 'Scaled Dot-Product Attention from Scratch in PyTorch';
    p.description = 'Implement the core Transformer attention formula: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V using pure PyTorch tensor operations.';
    p.step1 = 'Create Query, Key, Value tensors with shape (seq_len, d_k)';
    p.step2 = 'Compute scores = (Q @ K.T) / math.sqrt(d_k) and apply softmax along dim=-1';
    p.step3 = 'Multiply weights by Value matrix and verify output shape matches Query';
  } else if (t.includes('agent') || t.includes('react') || t.includes('tool calling') || t.includes('langgraph')) {
    p.title = 'ReAct Agent Perception-Action Reasoning Loop';
    p.description = 'Build a lightweight agent loop in Python with Thought, Action, and Observation states that dispatches tool calls to real functions.';
    p.step1 = 'Define mock tools: calculate(expr), search_database(query)';
    p.step2 = 'Simulate ReAct parsing: detect tool names in text and call function';
    p.step3 = 'Feed observation back into the loop until Final Answer stopping state';
  } else if (t.includes('mcp') || t.includes('server')) {
    p.title = 'Custom Python Model Context Protocol (MCP) Server';
    p.description = 'Build a minimal MCP server in Python exposing two custom tools (e.g. database query and model latency probe) to Claude/AI clients.';
    p.step1 = 'Define tool schemas with JSON-RPC compliant parameter types';
    p.step2 = 'Implement tool handlers returning formatted text or JSON resources';
    p.step3 = 'Test JSON-RPC communication via stdio or SSE transport';
  } else {
    // Dynamic clean fallback tailored from the specific lesson
    const cleanTitle = video.title.replace(/\[.*?\]/g, '').replace(/Day #\d+:?/g, '').trim();
    p.title = `Hands-On Scratch Lab: ${cleanTitle}`;
    p.description = `Build a standalone Python script from scratch applying ${video.topics || 'the core concepts of this lesson'} to reinforce retention.`;
    p.step1 = `Initialize project environment and write code skeleton in ${video.code_path || 'main.py'}`;
    p.step2 = `Implement the core logic demonstrated in "${cleanTitle}"`;
    p.step3 = `Test with edge cases, print verified console output, and push to GitHub`;
  }

  return p;
}

// Beginner Trap & Gotchas Database
function getBeginnerTrap(video, weekNum) {
  const t = (video.topics || '').toLowerCase();
  
  if (t.includes('input') || t.includes('typecasting') || t.includes('variable')) {
    return {
      title: "Mixing Strings & Integers (TypeError)",
      gotcha: "Writing `age = input('Age: ')` followed by `age + 1` crashes! Python's `input()` always returns a string (`str`), never an integer.",
      fix: "Always wrap input with `int()` or `float()` immediately: `age = int(input('Age: '))`."
    };
  } else if (t.includes('loop') || t.includes('for') || t.includes('range')) {
    return {
      title: "Off-By-One Range Pitfall (Exclusive Stop)",
      gotcha: "`range(1, 10)` stops at 9, NOT 10! The second parameter in Python ranges is always strictly exclusive.",
      fix: "If you need numbers 1 through 10 inclusive, write `range(1, 11)`."
    };
  } else if (t.includes('if') || t.includes('conditional') || t.includes('comparison')) {
    return {
      title: "Assignment `=` vs Equality `==`",
      gotcha: "Writing `if x = 5:` triggers a `SyntaxError: invalid syntax. Maybe you meant '=='?`.",
      fix: "Remember: Single `=` stores a value; double `==` checks equality."
    };
  } else if (t.includes('string') || t.includes('slice')) {
    return {
      title: "Strings are Immutable in Python",
      gotcha: "Attempting `text[0] = 'H'` triggers `TypeError: 'str' object does not support item assignment`.",
      fix: "Strings cannot be modified in place. Create a new string with slicing: `new_text = 'H' + text[1:]`."
    };
  } else if (t.includes('numpy') || t.includes('matrix')) {
    return {
      title: "Element-wise `*` vs Matrix `@` in NumPy",
      gotcha: "Writing `A * B` multiplies elements individually. To perform true linear algebra matrix dot products, you must use `@` or `np.dot(A, B)`.",
      fix: "Use `A @ B` for matrix multiplication; ensure inner dimensions match (e.g. `(m, k) @ (k, n)`)."
    };
  } else {
    return {
      title: "Indentation & Code Block Boundaries",
      gotcha: "Mixing tabs and spaces or inconsistent spacing causes `IndentationError: unindent does not match any outer indentation level`.",
      fix: "Always use standard 4 spaces per indentation level. Avoid mixing tabs and spaces."
    };
  }
}

// Daily Micro-Drill for Active Muscle Memory
function getDailyBeginnerDrill(video, weekNum) {
  const t = (video.topics || '').toLowerCase();
  
  if (t.includes('input') || t.includes('typecasting')) {
    return {
      challenge: "Cast string '25' to an integer, add 75, and print the resulting sum.",
      starter: `# Quick Micro-Drill: Typecasting\nval_str = "25"\n# Your code here:\n`
    };
  } else if (t.includes('loop') || t.includes('for')) {
    return {
      challenge: "Write a for loop that calculates the sum of numbers from 1 to 10 inclusive.",
      starter: `# Quick Micro-Drill: Loop Sum\ntotal = 0\nfor i in range(1, 11):\n    total += i\nprint(f"Sum is: {total}")\n`
    };
  } else if (t.includes('string') || t.includes('slice')) {
    return {
      challenge: "Reverse the string 'artificial_intelligence' using slice notation [::-1].",
      starter: `# Quick Micro-Drill: Slicing\ntext = "artificial_intelligence"\nreversed_text = text[::-1]\nprint(reversed_text)\n`
    };
  } else {
    return {
      challenge: "Define a function `greet(name)` that returns `Hello, <name>!` and test with your name.",
      starter: `# Quick Micro-Drill: First Function\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("Neeraj"))\n`
    };
  }
}

function renderDailyProjectCardHTML(taskObj, week) {
  const video = taskObj.video || {};
  const weekNum = taskObj.weekNum || (week ? parseInt((week.week || '1').replace(/[^0-9]/g, ''), 10) : 1);
  const weekGoal = (week && week.output_goal) ? week.output_goal : (taskObj.weekGoal || 'Complete weekly curriculum milestone');
  
  const proj = getDailyScratchProject(video, weekNum, weekGoal);
  const trap = getBeginnerTrap(video, weekNum);
  const drill = getDailyBeginnerDrill(video, weekNum);

  const encodedDrill = encodeURIComponent(drill.starter);

  return `
    <!-- DAILY SCRATCH REVISION PROJECT (BUILT FROM SCRATCH) -->
    <div class="neu-card p-4 sm:p-5 space-y-3.5 daily-project-card rounded-2xl border border-emerald-500/40">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="text-base sm:text-lg">🛠️</span>
          <span class="text-xs font-black uppercase text-emerald-400 tracking-wider font-mono">Daily Scratch Project (15–30 Min)</span>
        </div>
        <span class="neu-pill text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 border border-emerald-500/40">Build & Revise</span>
      </div>

      <div>
        <h4 class="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2 flex-wrap">
          <span>${escapeHTML(proj.title)}</span>
          <span class="text-[10px] font-mono font-normal text-slate-400">⏱️ ${escapeHTML(proj.time)}</span>
        </h4>
        <p class="text-xs text-slate-600 leading-relaxed font-normal">
          ${escapeHTML(proj.description)}
        </p>
      </div>

      <!-- 3-STEP REVISION CHECKLIST -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
        <div class="neu-inset p-3 rounded-xl">
          <span class="text-[10px] font-mono font-bold text-slate-400 block mb-1">Step 1: Setup & Input</span>
          <span class="text-slate-700 text-[11px] leading-snug block">${escapeHTML(proj.step1)}</span>
        </div>
        <div class="neu-inset p-3 rounded-xl">
          <span class="text-[10px] font-mono font-bold text-slate-400 block mb-1">Step 2: Core Logic</span>
          <span class="text-slate-700 text-[11px] leading-snug block">${escapeHTML(proj.step2)}</span>
        </div>
        <div class="neu-inset p-3 rounded-xl">
          <span class="text-[10px] font-mono font-bold text-emerald-400 block mb-1">Step 3: Verification</span>
          <span class="text-slate-700 text-[11px] leading-snug block">${escapeHTML(proj.step3)}</span>
        </div>
      </div>

      <!-- FEATURE 1 & 2: BEGINNER TRAP & DAILY MICRO-DRILL -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        
        <!-- Beginner Trap Card -->
        <div class="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
          <div class="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
            <span>⚠️ Beginner Trap:</span>
            <span>${escapeHTML(trap.title)}</span>
          </div>
          <p class="text-[11px] text-slate-300 leading-relaxed font-medium">
            ${escapeHTML(trap.gotcha)}
          </p>
          <div class="text-[11px] text-amber-300 font-mono pt-0.5">
            <strong>Fix:</strong> ${escapeHTML(trap.fix)}
          </div>
        </div>

        <!-- Micro-Drill Card -->
        <div class="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex flex-col justify-between space-y-2">
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-emerald-400 text-xs font-bold font-mono">🎯 2-Min Micro-Drill</span>
              <span class="text-[10px] text-slate-400 font-mono">Active Recall</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-snug">
              ${escapeHTML(drill.challenge)}
            </p>
          </div>
          
          <a href="playground.html?code=${encodedDrill}" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-sm self-start">
            <span>▶ Code & Verify in Playground</span>
            <span>→</span>
          </a>
        </div>

      </div>

      <!-- WEEKLY OUTPUT GOAL CONNECTION & PLAYGROUND ACTION -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex-wrap gap-2">
        <span class="flex items-center gap-1.5">
          <span>🎯</span> <strong>Weekly Deliverable:</strong> ${escapeHTML(proj.weeklyGoal)}
        </span>
        <div class="flex items-center gap-2.5 flex-wrap">
          <a href="playground.html" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] transition shadow-sm">
            <span>🐍 Run in Playground</span>
            <span>→</span>
          </a>
          <a href="projects.html" class="text-emerald-400 hover:underline font-mono text-[10px] font-bold">
            15 Resume Projects →
          </a>
        </div>
      </div>
    </div>
  `;
}
