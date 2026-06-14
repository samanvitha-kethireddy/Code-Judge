import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Code2, ArrowRight, Lock, Search } from "lucide-react";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const categories = ["All", "Array", "String", "Hash Table", "Tree", "Matrix", "Graph", "Dynamic Programming", "General"];

  useEffect(() => {
    axios.get("`${import.meta.env.VITE_API_URL}/problems")
      .then(res => setProblems(res.data))
      .catch(err => console.log("error loading board tracks:", err));
  }, []);

  const handleProblemClick = (problemId) => {
    if (!token) {
      navigate(`/login?redirect=/problems/${problemId}`);
    } else {
      navigate(`/problems/${problemId}`);
    }
  };

  const filteredProblems = problems.filter(prob => {
    const matchesSearch = prob.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || (prob.category || "General") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto space-y-8 z-10 relative">
        
        <div className="flex justify-between items-start border-b-4 border-zinc-900 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 font-black text-2xl tracking-tighter uppercase select-none">
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
                <Code2 size={20} className="stroke-[2.5]" />
              </span>
              <span>BITCRUSH // THE BOARD</span>
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-3 lowercase font-bold">
              [pick an algorithmic target. solve it or break our runtime engines trying.]
            </p>
          </div>
        </div>

        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
            <Search size={16} className="stroke-[2.5]" />
          </span>
          <input
            type="text"
            placeholder="search problem targets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-4 pl-12 text-base focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-900 transition lowercase rounded-none shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]"
          />
        </div>

        <div className="flex flex-wrap gap-2 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 border-2 text-sm font-black uppercase tracking-wide transition rounded-none ${
                selectedCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-transparent shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
                  : "bg-stone-50 dark:bg-zinc-950 border-zinc-900 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((prob) => (
              <div 
                key={prob._id}
                onClick={() => handleProblemClick(prob._id)}
                className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#18181b] dark:hover:shadow-[6px_6px_0px_0px_#000] transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-lg uppercase tracking-tight text-zinc-900 dark:text-white">
                      {prob.title}
                    </h3>
                    {!token && (
                      <span className="p-1 bg-stone-100 dark:bg-zinc-900 border border-zinc-900 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                        <Lock size={12} className="stroke-[2.5]" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 select-none">
                    <span className="text-xs uppercase font-black tracking-wider bg-stone-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 border border-zinc-400 dark:border-zinc-700">
                      {prob.category || "General"}
                    </span>
                    
                    <span className={`text-xs uppercase font-black tracking-wider px-2 py-0.5 border-2 border-zinc-900 dark:border-black shadow-[2px_2px_0px_0px_#000] ${
                      prob.difficulty?.toLowerCase() === "easy" ? "bg-lime-400 dark:bg-emerald-500 text-black" :
                      prob.difficulty?.toLowerCase() === "medium" ? "bg-orange-400 dark:bg-amber-500 text-black" :
                      "bg-pink-500 dark:bg-rose-500 text-white"
                    }`}>
                      {prob.difficulty}
                    </span>
                  </div>
                </div>

                <div className="text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform self-end sm:self-center p-1.5 bg-stone-100 dark:bg-zinc-900 border-2 border-transparent group-hover:border-zinc-900 dark:group-hover:border-zinc-700">
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-zinc-300 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-950 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]">
              <p className="text-zinc-400 dark:text-zinc-500 text-sm lowercase">[no matching problem file tracks found in cache]</p>
              <button 
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="mt-4 text-sm font-black uppercase tracking-wider text-zinc-950 dark:text-white underline hover:no-underline"
              >
                Reset applied variables
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}