import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, ShieldAlert, CheckCircle2, ArrowRight, Sun, Moon, X } from "lucide-react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  
  const [showTerms, setShowTerms] = useState(false);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-mono tracking-tight selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-300 relative overflow-x-hidden">
      
      <style>{`
        @keyframes brutalist-grid-move {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        .animate-moving-grid {
          animation: brutalist-grid-move 2s linear infinite;
        }
        @keyframes flame-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #ef4444); }
          50% { transform: scale(1.1) translateY(-1px); filter: drop-shadow(0 0 8px #f97316); }
        }
        .animate-flame-heart {
          display: inline-block;
          animation: flame-pulse 0.6s ease-in-out infinite;
          cursor: default;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      {/* 1. Structural Header Container */}
      <header className="w-full bg-stone-50 dark:bg-zinc-950 border-b-4 border-zinc-900 dark:border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase select-none">
            <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
              <Code2 size={20} className="stroke-[2.5]" />
            </span>
            <div className="flex items-center gap-1.5">
              <span>BITCRUSH</span>
              <span className="animate-flame-heart text-xl" aria-label="flaming heart">❤️‍🔥</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-zinc-900 dark:border-zinc-700 bg-stone-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold transition hover:bg-stone-200 dark:hover:bg-zinc-700"
              aria-label="Toggle System Theme"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link 
              to="/login" 
              className="text-sm font-black uppercase tracking-wide px-2 py-1 hover:underline text-zinc-700 dark:text-zinc-300"
            >
              sign in
            </Link>
            
            <Link 
              to="/register" 
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-sm font-black uppercase tracking-wider px-4 py-2.5 border-2 border-zinc-900 dark:border-transparent transition"
            >
              new sheep
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Hero Panel Grid Split */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-black uppercase tracking-widest px-3 py-1.5 border border-zinc-700 dark:border-transparent mb-6">
            // stop stressing, just let it run
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            HERD CODE. <br />
            <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 inline-block mt-4 border-2 border-zinc-900 dark:border-transparent">SEE IF IT BREAKS.</span>
          </h1>

          <p className="text-base font-medium text-zinc-700 dark:text-zinc-400 mt-8 max-w-xl leading-relaxed lowercase">
            [no corporate fluff. just a lawless pasture to run your code against brutal tests and watch the sheep shatter instantly.]
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <Link
              to="/register"
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 px-8 py-4 font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 border-2 border-transparent transition group shadow-[4px_4px_0px_0px_rgba(24,24,27,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
            >
              Enter the Pasture
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </Link>

            <Link
              to="/problems"
              className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black hover:bg-stone-100 dark:hover:bg-zinc-900/60 px-8 py-4 font-black uppercase tracking-wider text-sm text-zinc-900 dark:text-zinc-100 transition flex items-center justify-center shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]"
            >
              The Flock
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-5 w-full">
          {/* Feature 1 */}
          <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 flex items-start gap-4 shadow-[6px_6px_0px_0px_#18181b] dark:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#18181b] dark:hover:shadow-[8px_8px_0px_0px_#000] transition-all">
            <div className="p-2 bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white">
              <Code2 size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide text-zinc-900 dark:text-white mb-1.5">01 // raw pasture</h3>
             
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-normal lowercase">herd python or javascript straight in your browser. no configuration junk, no local environment mess. just write.</p>
            </div>
          </div>

          {/* Feature 2  */}
          <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 flex items-start gap-4 shadow-[6px_6px_0px_0px_#18181b] dark:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#18181b] dark:hover:shadow-[8px_8px_0px_0px_#000] transition-all">
            <div className="p-2 bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white">
              <ShieldAlert size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide text-zinc-900 dark:text-white mb-1.5">02 // wolf tracking</h3>
             
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-normal lowercase">if your algorithm goes feral and hits an infinite loop, we snipe the sub-process before your browser folds.</p>
            </div>
          </div>

          {/* Feature 3  */}
          <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 flex items-start gap-4 shadow-[6px_6px_0px_0px_#18181b] dark:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#18181b] dark:hover:shadow-[8px_8px_0px_0px_#000] transition-all">
            <div className="p-2 bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white">
              <CheckCircle2 size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide text-zinc-900 dark:text-white mb-1.5">03 // zero mind games</h3>
              
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-normal lowercase">raw, unfiltered error logs straight from the runtime into your console. no corporate talk, no mystery codes.</p>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="w-full bg-zinc-900 dark:bg-black border-t-4 border-zinc-950 text-zinc-400 dark:text-zinc-500 py-6 z-10 relative">
    
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest gap-4">
          <p>built by sheep // all pastures operational enough.</p>
          <div className="flex gap-6">
            <button 
              onClick={() => setShowTerms(true)}
              className="text-zinc-400 hover:text-white transition underline decoration-2 cursor-pointer font-bold uppercase"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
         
          <div className="bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-white p-6 max-w-md w-full relative shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff]">
            
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 p-1 border-2 border-zinc-900 dark:border-zinc-100 bg-stone-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-stone-200"
              aria-label="Close Terms"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            <h2 className="text-xl font-black uppercase text-zinc-900 dark:text-white mb-4 border-b-2 border-zinc-900 dark:border-zinc-800 pb-2">
              LEGAL NOTICE
            </h2>
            <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300 lowercase leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p className="font-bold uppercase text-red-500">// READ THIS VERY CAREFULLY</p>
              <p>
                1.by clicking away or continuing to herd scripts on this domain, you officially agree to lease your eternal soul, metaphysical essence, and any future wool inheritance rights to bitcrush operations indefinitely.
              </p>
              <p>2. if your code causes an unhandled memory stack segment leak or runs into an infinite loop that somehow breaks our pasture limits, you are contractually obligated to buy the head shepherd a clean premium double espresso shot immediately.</p>
              <p>3.we accept zero responsibility for existential dread caused by failing basic data structure arrays and getting kicked out of the flock at 3:00 am.</p>
              <p>4. data collection policies: we tracking your clicks, but mostly we just judge your indentations and see if you're a wolf in sheep's clothing secretly.</p>
            </div>

            <button 
              onClick={() => setShowTerms(false)}
              className="w-full mt-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 py-2.5 font-black uppercase tracking-wider text-sm border-2 border-transparent transition"
            >
              I Accept (Duh)
            </button>

          </div>
        </div>
      )}

    </div>
  );
}