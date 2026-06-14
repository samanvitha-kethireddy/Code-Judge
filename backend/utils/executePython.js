const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executePython = (code, input) => {
  return new Promise((resolve) => {
    const timestamp = Date.now();
    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const filePath = path.join(tempDir, `code_${timestamp}.py`);
    const inputPath = path.join(tempDir, `input_${timestamp}.txt`);

    fs.writeFileSync(filePath, code);
    fs.writeFileSync(inputPath, input);

    // Dynamic handling: defaults to 'python3' on hosting servers, falls back to 'python' locally
    const command = process.platform === "win32" ? `python "${filePath}" < "${inputPath}"` : `python3 "${filePath}" < "${inputPath}"`;


  exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      } catch {}

      if (error?.killed) return resolve({ verdict: "Time Limit Exceeded" });
      
      if (error) {
        let cleanError = stderr || error.message;
        
        // 🚀 Regex to scrub out absolute local file path strings completely
        cleanError = cleanError.replace(/["']?[A-Za-z]:\\[^"'\n]*code_\d+\.py["']?/g, "main.py");
        cleanError = cleanError.replace(/\/.*?\/code_\d+\.py/g, "main.py"); // Linux fallback
        
        return resolve({ verdict: "Runtime Error", error: cleanError });
      }

      resolve({ output: stdout });
    });
  
  });
};

module.exports = executePython;