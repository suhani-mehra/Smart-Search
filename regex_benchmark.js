const fs = require("fs");
const path = require("path");

const FOLDER_PATH = ".";
const QUERY = "classmate training courses lessons progress mandatory employees";

const EXPECTED_CORRECT_TOTAL = 40;

// ---------- text helpers ----------
function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s) {
  return normalize(s).split(" ").filter(Boolean);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------- load files ----------
function loadFiles(folderPath) {
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".txt"));

  return files.map(file => {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, "utf8");

    return {
      fileName: file,

      // filename is ONLY used for grading correctness
      // it is NOT searched by the regex algorithm
      isCorrect: file.toLowerCase().startsWith("classmate"),

      // searchable text is ONLY file content
      content: content
    };
  });
}

// ---------- regex search over content only ----------
function regexSearchFiles(query, files) {
  const qNorm = normalize(query);
  const qTokens = tokenize(query);

  if (!qNorm) return [];

  const phraseRegex = new RegExp(escapeRegex(qNorm), "i");
  const wordRegexes = qTokens.map(word => new RegExp(escapeRegex(word), "i"));

  const results = [];

  for (const file of files) {
    let score = 0;

    // IMPORTANT: only content is searched
    const content = normalize(file.content);

    // Full phrase match
    if (phraseRegex.test(content)) {
      score += 25;
    }

    // Individual query word matches
    for (const regex of wordRegexes) {
      if (regex.test(content)) {
        score += 5;
      }
    }

    // Extra weights for terms that suggest the file is really about the Classmate platform
    const strongTerms = [
      "platform",
      "training",
      "courses",
      "lessons",
      "mandatory",
      "completion",
      "progress",
      "reports",
      "employees",
      "managers",
      "learning",
      "digital",
      "on-demand"
    ];

    for (const term of strongTerms) {
      const termRegex = new RegExp("\\b" + escapeRegex(term) + "\\b", "i");
      if (termRegex.test(content)) {
        score += 4;
      }
    }

    if (score > 0) {
      results.push({
        fileName: file.fileName,
        isCorrect: file.isCorrect,
        score
      });
    }
  }

  results.sort((a, b) => {
    return b.score - a.score || a.fileName.localeCompare(b.fileName);
  });

  return results;
}

// ---------- evaluation ----------
function evaluateAtK(results, k, correctTotal) {
  const topK = results.slice(0, k);
  const correctInTopK = topK.filter(r => r.isCorrect).length;
  const incorrectInTopK = topK.length - correctInTopK;

  const precision = topK.length === 0
    ? 0
    : +(correctInTopK / topK.length * 100).toFixed(2);

  const recall = correctTotal === 0
    ? 0
    : +(correctInTopK / correctTotal * 100).toFixed(2);

  return {
    topK: k,
    correctInTopK,
    incorrectInTopK,
    totalShown: topK.length,
    precision,
    recall
  };
}

// ---------- run benchmark ----------
function runBenchmark() {
  const files = loadFiles(FOLDER_PATH);

  const actualCorrectTotal = files.filter(f => f.isCorrect).length;
  const actualIncorrectTotal = files.length - actualCorrectTotal;

  const correctTotal = actualCorrectTotal || EXPECTED_CORRECT_TOTAL;

  const start = performance.now();
  const results = regexSearchFiles(QUERY, files);
  const end = performance.now();

  console.log("Regex File Content Search Benchmark");
  console.log("-----------------------------------");
  console.log("Query:", QUERY);
  console.log("Files tested:", files.length);
  console.log("Correct files:", actualCorrectTotal);
  console.log("Incorrect files:", actualIncorrectTotal);
  console.log("Results returned:", results.length);
  console.log("Search time:", +(end - start).toFixed(3), "ms");
  console.log("");

  const checks = [20, 30, 40, 50];

  for (const k of checks) {
    const stat = evaluateAtK(results, k, correctTotal);

    console.log(
      `Top ${k}: ${stat.correctInTopK}/${stat.totalShown} correct ` +
      `| Precision: ${stat.precision}% ` +
      `| Recall of 40 correct files: ${stat.recall}% ` +
      `| Incorrect in top ${k}: ${stat.incorrectInTopK}`
    );
  }

  console.log("");
  console.log("Top 10 results:");
  results.slice(0, 10).forEach((r, i) => {
    console.log(
      `${i + 1}. ${r.fileName} | score=${r.score} | correct=${r.isCorrect}`
    );
  });
}

runBenchmark();
