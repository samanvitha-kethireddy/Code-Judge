import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit2, Layers, FileText } from "lucide-react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState("Array"); 
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  const categories = ["Array", "String", "Hash Table", "Tree", "Matrix", "Graph", "Dynamic Programming", "General"];

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/problems", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setProblems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "", isHidden: false }]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "", isHidden: false }]);
  };

  const updateTestCase = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const handleCreate = async () => {
    try {
      await axios.post(
        "http://localhost:5000/problems",
        { title, description, difficulty, category, testCases },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      alert("Problem Created");
      setTitle("");
      setDescription("");
      setCategory("Array");
      setTestCases([{ input: "", expectedOutput: "", isHidden: false }]);
      fetchProblems();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProblem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/problems/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Problem Deleted");
      fetchProblems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden text-lg">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] bg-size-[20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto space-y-10 z-10 relative">
        
        <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 p-6 md:p-8 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#18181b]">
          <div className="flex items-center gap-3 mb-6 border-b-4 border-zinc-900 dark:border-zinc-800 pb-4">
            <span className="p-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border border-zinc-950">
              <Plus size={20} className="stroke-3" />
            </span>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">// CREATE CHALLENGE CORE</h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 lowercase mt-1 font-bold">Add new verification scripts inside the engine workspace registry.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Problem Title</label>
              <input
                type="text"
                placeholder="E.G., TWO_SUM_MATRIX_INDEXING"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-stone-200 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 p-3 text-sm font-bold focus:outline-none focus:bg-stone-100 dark:focus:bg-zinc-900 uppercase placeholder:lowercase transition text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Description Instruction Set</label>
              <textarea
                placeholder="describe input stream formats, edge boundary constraints, and maximum big-o constraints..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-stone-200 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 p-4 text-sm focus:outline-none focus:bg-stone-100 dark:focus:bg-zinc-900 transition font-mono text-zinc-900 dark:text-zinc-100 font-bold"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Complexity Target Bounds</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-stone-200 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 p-3 text-sm font-black uppercase text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Data Allocation Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-stone-200 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 p-3 text-sm font-black uppercase text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-4 border-zinc-900 dark:border-zinc-800">
              <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2 select-none">
                <Layers size={14} /> // STDIN / STDOUT TEST CASES
              </h2>
              
              <div className="space-y-4">
                {testCases.map((tc, index) => (
                  <div key={index} className="bg-stone-200 dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-800 p-4 relative">
                    <div className="flex justify-between items-center mb-3 border-b-2 border-dashed border-zinc-400 dark:border-zinc-800 pb-2">
                      <span className="text-[11px] font-black text-zinc-900 dark:text-white bg-stone-300 dark:bg-zinc-800 px-1.5 py-0.5 uppercase">CASE_INDEX #0{index + 1}</span>
                      <label className="flex items-center gap-2 text-xs font-black text-zinc-700 dark:text-zinc-400 cursor-pointer uppercase select-none">
                        <input
                          type="checkbox"
                          checked={tc.isHidden || false}
                          onChange={(e) => updateTestCase(index, "isHidden", e.target.checked)}
                          className="w-4 h-4 rounded-none border-2 border-zinc-900 bg-stone-50 dark:bg-zinc-900 checked:bg-zinc-900 text-zinc-900 database:accent-zinc-100 accent-zinc-900"
                        />
                        Secret Test Case
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase mb-1">[stdin payload]</span>
                        <textarea
                          placeholder="pipe matrix stream data here..."
                          value={tc.input}
                          onChange={(e) => updateTestCase(index, "input", e.target.value)}
                          className="w-full bg-stone-50 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-2.5 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
                          rows={2}
                        />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase mb-1">[expected output token]</span>
                        <textarea
                          placeholder="return calculation evaluation..."
                          value={tc.expectedOutput}
                          onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                          className="w-full bg-stone-50 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-2.5 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
                          rows={2}
                        />
                      </div>
                    </div>

                    {testCases.length > 1 && (
                      <button
                        onClick={() => setTestCases(testCases.filter((_, i) => i !== index))}
                        className="mt-3 text-xs font-black text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400 flex items-center gap-1 uppercase tracking-tight"
                      >
                        <Trash2 size={12} /> [kill case parameter]
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-5 pt-3">
                <button 
                  onClick={addTestCase} 
                  className="bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-black px-4 py-2.5 border-2 border-zinc-900 dark:border-zinc-700 transition uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]"
                >
                  Increase Test Count
                </button>
                <button 
                  onClick={handleCreate} 
                  className="bg-lime-400 hover:bg-lime-500 text-zinc-950 text-sm font-black px-5 py-2.5 border-2 border-zinc-900 transition uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]"
                >
                  Deploy Challenge
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-tighter uppercase border-b-4 border-zinc-900 dark:border-zinc-800 pb-2 flex items-center gap-2 select-none">
            <FileText size={18} className="text-zinc-500 dark:text-zinc-400" /> // DEPLOYED CHALLENGES
          </h2>
          
          <ul className="grid grid-cols-1 gap-3">
            {problems.map((problem) => (
              <li 
                key={problem._id} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-stone-50 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-4 gap-4 shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#18181b]"
              >
                <div className="space-y-2">
                  <p className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight text-base">{problem.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-300 px-2 py-0.5 border border-zinc-900 font-black">
                      {problem.category || "General"}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 font-black border-2 border-zinc-900 shadow-[1px_1px_0px_0px_#000] ${
                      problem.difficulty === "Easy" ? "bg-lime-400 text-black" :
                      problem.difficulty === "Medium" ? "bg-orange-400 text-black" :
                      "bg-pink-500 text-white"
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t-2 border-stone-200 sm:border-0 pt-3 sm:pt-0">
                  <button 
                    onClick={() => navigate(`/admin/edit/${problem._id}`)} 
                    className="p-2 bg-stone-200 hover:bg-stone-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-2 border-zinc-900 dark:border-zinc-700 transition"
                    title="Edit Properties"
                  >
                    <Edit2 size={13} className="stroke-[2.5]" />
                  </button>
                  <button 
                    onClick={() => deleteProblem(problem._id)} 
                    className="p-2 bg-pink-500 hover:bg-pink-600 text-white border-2 border-zinc-900 transition"
                    title="Purge Object"
                  >
                    <Trash2 size={13} className="stroke-[2.5]" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}