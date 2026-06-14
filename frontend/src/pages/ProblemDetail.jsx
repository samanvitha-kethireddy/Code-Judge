import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import { Play, CheckCircle2, Terminal, Code2, ShieldAlert } from "lucide-react";

const STARTER_CODE = {
  python: `def solve():\n    # Write your solution here\n    print("Hello CodeJudge")\n\nsolve()`,
  javascript: `function solve() {\n    // Write your solution here\n    console.log("Hello CodeJudge");\n}\n\nsolve();`,
};

export default function ProblemDetail() {
  const { id } = useParams();
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [problem, setProblem] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [failedTestCase, setFailedTestCase] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [runOutput, setRunOutput] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/problems/${id}`)
      .then((res) => {
        setProblem(res.data);
        const savedCode = localStorage.getItem(`code_${id}_${language}`);
        setCode(savedCode || STARTER_CODE[language]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const savedCode = localStorage.getItem(`code_${id}_${newLang}`);
    setCode(savedCode || STARTER_CODE[newLang]);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem(`code_${id}_${language}`, newCode);
  };

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

  const handleRun = async () => {
    try {
      setRunOutput("Running script framework parameters...");
      const res = await axios.post("http://localhost:5000/execute", {
        code,
        language,
        input: customInput,
      });

      setRunOutput(res.data.output || res.data.error || res.data.verdict);
    } catch (err) {
      console.log(err);
    }
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-200 dark:bg-zinc-900 font-mono">
        <h1 className="text-3xl font-black text-zinc-400 dark:text-zinc-600 animate-pulse tracking-tighter uppercase">
          // INITIALIZING WORKSPACE RUNTIME...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden text-base">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-8 z-10 relative">
        
        <div className="flex justify-between items-start border-b-4 border-zinc-900 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 font-black text-3xl tracking-tighter uppercase select-none">
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
                <Code2 size={24} className="stroke-[2.5]" />
              </span>
              <span>BITCRUSH // CHALLENGE OPERATOR</span>
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-3 lowercase font-bold">
              [instance target id: {id}. inject scripts inside isolated runtime limits.]
            </p>
          </div>

          <Link 
            to="/problems" 
            className="border-2 border-zinc-900 dark:border-zinc-700 px-4 py-2 text-base font-black uppercase tracking-wider bg-stone-50 dark:bg-zinc-950 hover:bg-stone-100 dark:hover:bg-zinc-800 transition shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#000]"
          >
            Back to Arena
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]">
              <div className="flex items-center justify-between gap-4 border-b-2 border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
                <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {problem.title}
                </h1>
              
                <span
                  className={`text-sm font-black uppercase tracking-wider px-3 py-1 border-2 border-zinc-900 dark:border-black shadow-[2px_2px_0px_0px_#000] ${
                    problem.difficulty?.toLowerCase() === "easy" ? "bg-lime-400 dark:bg-emerald-500 text-black" :
                    problem.difficulty?.toLowerCase() === "medium" ? "bg-orange-400 dark:bg-amber-500 text-black" :
                    "bg-pink-500 dark:bg-rose-500 text-white"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-base text-zinc-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap lowercase">
                {problem.description}
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]">
              <h2 className="text-base font-black uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
                // test cases
              </h2>
              <div className="space-y-4">
                {problem.testCases && problem.testCases.length > 0 ? (
                  problem.testCases.map((tc, index) => (
                    <div key={tc._id || index} className="border-2 border-zinc-900 dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 p-4">
                      <h4 className="font-black text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider mb-3">
                        [CASE INDEX :: 0{index + 1}]
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase block mb-1">feed input</span>
                          <pre className="bg-stone-50 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 px-3 py-2 text-base font-mono overflow-x-auto text-zinc-900 dark:text-zinc-200">
                            {tc.input}
                          </pre>
                        </div>
                        <div>
                          <span className="text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase block mb-1">target output</span>
                          <pre className="bg-stone-50 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 px-3 py-2 text-base font-mono overflow-x-auto text-zinc-900 dark:text-zinc-200">
                            {tc.expectedOutput}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 dark:text-zinc-400 text-base lowercase italic border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-4 text-center">
                    [no public test cases verified on current index layout]
                  </p>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-white tracking-tight">WORKSPACE LOGIC</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 lowercase">[execution terminal interface]</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="border-2 border-zinc-900 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-950 p-2 px-4 text-base font-black uppercase tracking-wider focus:outline-none cursor-pointer rounded-none"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>

              <div className="border-4 border-zinc-900 dark:border-black overflow-hidden bg-zinc-955 text-base">
                <CodeEditor code={code} setCode={handleCodeChange} language={language} />
              </div>

              <div>
                <label className="block text-sm font-black text-zinc-600 dark:text-zinc-400 tracking-wider mb-2">
                  CUSTOM EXECUTION PARAMS 
                </label>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="inject execution lines or feed variables here..."
                  className="border-2 border-zinc-900 dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 p-3 w-full font-mono text-base focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition lowercase rounded-none text-zinc-900 dark:text-zinc-100"
                  rows={3}
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleRun}
                  className="bg-stone-50 hover:bg-stone-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-2 border-zinc-900 dark:border-zinc-700 px-6 py-3.5 text-base font-black uppercase tracking-wider transition flex items-center gap-2 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Play size={16} className="fill-current stroke-[2.5]" />
                  Test Engine Execution
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 border-2 border-zinc-900 dark:border-transparent px-6 py-3.5 text-base font-black uppercase tracking-wider transition flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <CheckCircle2 size={16} className="stroke-[2.5]" />
                  Submit Evaluation
                </button>
              </div>

              {runOutput && (
                <div className="bg-zinc-955 border-4 border-zinc-900 text-zinc-100 p-4 font-mono shadow-[2px_2px_0px_0px_#000]">
                  <h3 className="flex items-center gap-2 font-black text-xs text-zinc-400 uppercase tracking-widest mb-2 border-b border-zinc-900 pb-2">
                    <Terminal size={16} className="text-pink-800 stroke-[2.5]" /> STANDALONE CONSOLE STACK BUFFER
                  </h3>
                  <pre className="whitespace-pre-wrap text-base text-pink-800 leading-relaxed overflow-auto max-h-48 lowercase">
                    {runOutput}
                  </pre>
                </div>
              )}

              {verdict && (
                <div className={`p-4 border-4 border-zinc-900 dark:border-black shadow-[2px_2px_0px_0px_#000] ${
                  verdict === "Accepted" ? "bg-lime-400 text-black" : "bg-pink-500 text-white"
                }`}>
                  <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2 uppercase">
                    VERDICT RUNWAY REPORT // {verdict}
                  </h2>
                  {failedTestCase !== null && (
                    <p className={`mt-1 text-base font-black uppercase tracking-wider ${
                      verdict === "Accepted" ? "text-zinc-800" : "text-zinc-100"
                    }`}>
                      [runtime crash pipeline error flagged on step segment index #{failedTestCase}]
                    </p>
                  )}
                </div>
              )}

              {runtimeError && (
                <div className="bg-zinc-955 border-4 border-pink-600 text-pink-400 p-4 font-mono shadow-[2px_2px_0px_0px_#000]">
                  <span className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider mb-2 text-pink-500 border-b border-zinc-900/60 pb-2">
                    <ShieldAlert size={16} className="stroke-[2.5]" /> SYSTEM CORE ENGINE CRASH DUMP:
                  </span>
                  <pre className="text-base overflow-auto whitespace-pre-wrap leading-relaxed lowercase">
                    {runtimeError}
                  </pre>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}