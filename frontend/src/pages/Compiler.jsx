import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Editor from "@monaco-editor/react";
import { Play, Trash2, Copy, Terminal, Code2 } from "lucide-react";

const STARTER_CODE = {
  python: `print("Hello World")`,
  javascript: `console.log("Hello World");`,
};

export default function Compiler() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(STARTER_CODE.python);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session authentication credentials missing. Please register an account profile instance.");
      navigate(`/login?redirect=/problems/${id || ""}`);
    }
  }, [id, navigate]);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang] || "");
  };

  const handleRun = async () => {
    try {
      setLoading(true);
      setOutput("Running execution cycle...");

      const res = await axios.post("`${import.meta.env.VITE_API_URL}/execute", {
        language,
        code,
        input,
      });

      if (res.data.error) {
        setOutput(res.data.error);
      } else if (res.data.verdict) {
        setOutput(`Verdict status received: \n${res.data.verdict}`);
      } else {
        setOutput(res.data.output || "Code executed successfully with zero standard output.");
      }
    } catch (err) {
      setOutput(err.response?.data?.error || "Execution failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert("Output text copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden text-base">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-8 z-10 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-zinc-900 dark:border-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2.5 font-black text-3xl tracking-tighter uppercase select-none">
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
                <Code2 size={24} className="stroke-[2.5]" />
              </span>
              <span>COMPILER // PLAYGROUND</span>
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-3 lowercase font-bold">
              [run standalone scripts instantly. compile algorithms or crash runtime engines.]
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto select-none">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full md:w-auto bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 px-4 py-2.5 text-base font-black uppercase tracking-wider focus:outline-none rounded-none shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] cursor-pointer text-zinc-900 dark:text-zinc-100"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>

            <button
              onClick={handleRun}
              disabled={loading}
              className={`w-full md:w-auto px-6 py-3 border-4 border-zinc-900 dark:border-zinc-800 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 rounded-none transition-all shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                loading 
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed" 
                  : "bg-lime-400 dark:bg-emerald-500 text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#a3e635] dark:hover:shadow-[6px_6px_0px_0px_#10b981]"
              }`}
            >
              <Play size={14} fill="currentColor" className="stroke-[2.5]" />
              {loading ? "Compiling..." : "Execute_Code"}
            </button>
          </div>
        </div>

        {/* Editor & Console Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Box 1: Source Editor Workspace Block */}
          <div className="lg:col-span-7 bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 flex flex-col shadow-[4px_4px_0px_0px_#06b6d4] hover:shadow-[6px_6px_0px_0px_#22d3ee] transition-all">
            <div className="bg-stone-100 dark:bg-zinc-800/60 px-4 py-2.5 border-b-2 border-zinc-900 dark:border-zinc-800 flex justify-between items-center select-none">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">01 // SOURCE_EDITOR_WORKSPACE</span>
              <span className="text-xs font-black px-2 py-0.5 border border-zinc-400 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">{language}</span>
            </div>
            
            <div className="flex-1 min-h-[500px] bg-stone-50 dark:bg-zinc-950 p-4 border-t border-transparent">
              <Editor
                height="100%"
                theme="vs-dark" 
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: 16,
                  fontFamily: "monospace",
                  minimap: { enabled: false },
                  automaticLayout: true,
                  padding: { top: 8 },
                  roundedSelection: false,
                  selectOnLineNumbers: true,
                  renderLineHighlight: "all"
                }}
              />
            </div>
          </div>

          {/* Consoles Stack Right Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Box 2: Standard Input Card */}
            <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 p-5 shadow-[4px_4px_0px_0px_#f97316] hover:shadow-[6px_6px_0px_0px_#fb923c] transition-all">
              <h2 className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3 border-b-2 border-zinc-900 dark:border-zinc-800 pb-1 select-none">
                02 // STANDARD_INPUT (STDIN)
              </h2>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="w-full bg-stone-100 dark:bg-zinc-955 border-2 border-zinc-800 text-zinc-900 dark:text-zinc-100 p-3 text-base focus:outline-none focus:border-orange-500 rounded-none placeholder-zinc-400 dark:placeholder-zinc-600 font-bold lowercase tracking-wide dark:bg-zinc-950 dark:border-zinc-800"
                placeholder="[enter dynamic variable arguments execution arrays separated by line breaks...]"
              />
            </div>

            {/* Box 3: Terminal Output Logs */}
            <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 p-5 flex-1 min-h-[320px] flex flex-col shadow-[4px_4px_0px_0px_#a3e635] hover:shadow-[6px_6px_0px_0px_#4ade80] transition-all">
              <div className="flex justify-between items-center mb-3 border-b-2 border-zinc-900 dark:border-zinc-800 pb-2 select-none">
                <h2 className="flex items-center gap-2 text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                  <Terminal size={14} className="text-zinc-900 dark:text-zinc-100 stroke-[2.5]" />
                  03 // TERMINAL_OUTPUT_STREAM
                </h2> 

                {output && (
                  <div className="flex gap-1">
                    <button
                      onClick={copyOutput}
                      title="Copy Output Logs"
                      className="p-1 border border-zinc-800 bg-stone-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-none transition"
                    >
                      <Copy size={14} className="stroke-[2.5]" />
                    </button>
                    <button
                      onClick={() => setOutput("")}
                      title="Flush Stream Output"
                      className="p-1 border border-zinc-800 bg-stone-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-rose-500 rounded-none transition"
                    >
                      <Trash2 size={14} className="stroke-[2.5]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Console Output Display Box */}
              <div className="flex-1 overflow-y-auto max-h-[300px] bg-stone-100 dark:bg-zinc-955 p-4 border-2 border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950">
                <pre className="whitespace-pre-wrap font-mono text-base font-bold leading-relaxed text-cyan-600 dark:text-emerald-400">
                  {output || (
                    <span className="text-zinc-400 dark:text-zinc-500 lowercase italic font-normal">
                      [no active standard stream logs pipeline captured yet. feed scripts and execute matrix block.]
                    </span>
                  )}
                </pre>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}