const executePython = require("./executePython");
const executeJs = require("./executeJs");
const executeCpp = require("./executeCpp");

const executeCode = async (
  language,
  code,
  input
) => {

  if (language === "python") {
    return executePython(code, input);
  }

  if (language === "javascript") {
    return executeJs(code, input);
  }

  if (language === "cpp") {
    return executeCpp(code, input);
  }

  return {
    verdict: "Unsupported Language",
  };
};

module.exports = executeCode;