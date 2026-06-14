import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Sun, Moon, LogOut } from "lucide-react";
import { jwtDecode } from "jwt-decode"; 

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.log("Session parse error:", err);
        setIsAdmin(false);
      }
    }
  }, [token]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-stone-100 dark:bg-zinc-950 border-b-4 border-zinc-900 dark:border-black px-6 py-4 flex flex-col sm:flex-row justify-between items-center font-mono gap-4 tracking-tight transition-colors duration-300 relative z-50">
      
      {!token ? (
        <Link
          to="/"
          className="flex items-center gap-2.5 font-black text-xl tracking-tighter uppercase select-none group"
        >
          <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent transition-transform group-hover:-translate-y-0.5">
            <Code2 size={16} className="stroke-[2.5]" />
          </span>
          <span className="text-zinc-900 dark:text-white">
            BITCRUSH // <span className="text-cyan-500 dark:text-cyan-400">CORE</span>
          </span>
        </Link>
      ) : (
        <div className="flex items-center gap-2.5 font-black text-xl tracking-tighter uppercase select-none">
          <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
            <Code2 size={16} className="stroke-[2.5]" />
          </span>
          <span className="text-zinc-900 dark:text-white flex items-center gap-2">
            BITCRUSH // <span className="text-cyan-500 dark:text-cyan-400">RUNTIME</span>
            {isAdmin && (
              <span className="text-[10px] font-black bg-amber-400 text-zinc-950 border-2 border-zinc-900 px-1.5 py-0.5 shadow-[1px_1px_0px_0px_#000] tracking-widest">
                ADMIN_NODE
              </span>
            )}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
        
        {token && !isAdmin && (
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-black uppercase tracking-tight">
            <Link to="/problems" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              [problems]
            </Link>
            <Link to="/submissions" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              [submissions]
            </Link>
            <Link to="/leaderboard" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              [leaderboard]
            </Link>
            <Link to="/compiler" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              [compiler]
            </Link>
            <Link to="/profile" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              [profile]
            </Link>
          </div>
        )}

        {token && !isAdmin && (
          <div className="hidden sm:block h-5 w-0.5 bg-zinc-300 dark:bg-zinc-800" />
        )}

        <div className="flex items-center gap-4 justify-end w-full sm:w-auto border-t-2 border-zinc-100 dark:border-zinc-900 sm:border-0 pt-4 sm:pt-0">
          
          <button
            onClick={toggleTheme}
            className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-2 border-zinc-900 dark:border-zinc-700 transition shadow-[1.5px_1.5px_0px_0px_#000]"
            aria-label="Toggle Layout Mode"
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400 stroke-[2.5]" /> : <Moon size={14} className="stroke-[2.5]" />}
          </button>

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-pink-500 hover:bg-pink-600 text-white border-2 border-zinc-900 px-4 py-2 text-xs font-black uppercase tracking-wider transition shadow-[2px_2px_0px_0px_#000]"
            >
              <span className="flex items-center gap-1.5">
                <LogOut size={12} className="stroke-3" /> Logout._.
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider">
              <Link
                to="/login"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition px-2 py-1.5"
              >
                Sign_In
              </Link>
              <Link
                to="/register"
                className="bg-lime-400 hover:bg-lime-500 text-zinc-950 border-2 border-zinc-900 px-4 py-2 transition shadow-[2px_2px_0px_0px_#000]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}