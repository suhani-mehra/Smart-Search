const fs = require("fs");
const path = require("path");

const FOLDER_PATH = "./test_files";
const QUERY = "classmate training courses lessons progress mandatory employees";

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

      // filename is ONLY used for ground truth, not search
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

    // phrase match
    if (phraseRegex.test(content)) {
      score += 25;
    }

    // word matches
    for (const regex of wordRegexes) {
      const matches = content.match(regex);
      if (matches) {
        score += 5;
      }
    }

    // extra weighting for words that prove it is actually about the platform
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
      "managers"
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

// ---------- accuracy evaluation ----------
function countCorrectAtK(results, k) {
  const topK = results.slice(0, k);
  const correct = topK.filter(r => r.isCorrect).length;

  return {
    topK: k,
    correct,
    total: topK.length,
    accuracy: topK.length === 0 ? 0 : +(correct / topK.length * 100).toFixed(2)
  };
}

function runBenchmark() {
  const files = loadFiles(FOLDER_PATH);

  const start = performance.now();
  const results = regexSearchFiles(QUERY, files);
  const end = performance.now();

  console.log("Regex File Content Search Benchmark");
  console.log("-----------------------------------");
  console.log("Query:", QUERY);
  console.log("Files tested:", files.length);
  console.log("Results returned:", results.length);
  console.log("Search time:", +(end - start).toFixed(3), "ms");
  console.log("");

  const checks = [20, 30, 40, 50];

  for (const k of checks) {
    const stat = countCorrectAtK(results, k);
    console.log(
      `Top ${k}: ${stat.correct}/${stat.total} correct (${stat.accuracy}%)`
    );
  }

  console.log("");
  console.log("Top results:");
  results.slice(0, 10).forEach((r, i) => {
    console.log(
      `${i + 1}. ${r.fileName} | score=${r.score} | correct=${r.isCorrect}`
    );
  });
}

runBenchmark();
