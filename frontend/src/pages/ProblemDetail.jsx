import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";

export default function ProblemDetail() {
  const { id } = useParams();
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [problem, setProblem] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [failedTestCase, setFailedTestCase] = useState(null);

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
setVerdict("");
setRuntimeError("");
setFailedTestCase(null);
    const res = await axios.post(
      "http://localhost:5000/submit",
      {
        problemId: id,
        code,
        language,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setVerdict(res.data.verdict);
setRuntimeError(res.data.error || "");
setFailedTestCase(res.data.failedTestCase || null);

  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    axios
      .get(`http://localhost:5000/problems/${id}`)
      .then((res) => setProblem(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!problem) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{problem.title}</h1>

      <p className="mt-4">{problem.description}</p>

      <p className="mt-2">Difficulty: {problem.difficulty}</p>
      <div className="mt-8">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 mb-4"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
        </select>

        <CodeEditor code={code} setCode={setCode} language={language} />
        <button
          onClick={handleSubmit}
          className="bg-green-600 px-4 py-2 rounded mt-4"
        >
          Submit Solution
        </button>
        {verdict && (
  <h2
    className={`mt-4 text-xl font-bold ${
      verdict === "Accepted"
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    Verdict: {verdict}
  </h2>
)}
{failedTestCase !== null  && (
  <p className="mt-2 text-red-600 font-medium">
    Failed on Test Case #{failedTestCase}
  </p>
)}

{runtimeError && (
  <pre className="mt-4 bg-red-100 text-red-700 p-4 rounded overflow-auto whitespace-pre-wrap">
    {runtimeError}
  </pre>
)}
      </div>
    </div>
  );
}
