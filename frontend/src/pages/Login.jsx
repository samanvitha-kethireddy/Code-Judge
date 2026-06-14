import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Code2, KeyRound, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      const decoded = jwtDecode(res.data.token);

      if (decoded.isAdmin) {
        navigate("/admin");
      } else {
        navigate(new URLSearchParams(location.search).get("redirect") || "/problems");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Check your password or email again.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-6 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="w-full max-w-md bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#18181b] dark:shadow-[8px_8px_0px_0px_#000] z-10 relative">
        
        <div className="flex flex-col items-center mb-8 text-center select-none">
          <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase mb-8 z-10 relative select-none">
        <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
          <Code2 size={18} className="stroke-[2.5]" />
        </span>
        <span>BITCRUSH <span className="text-xs text-red-500">❤️‍🔥</span></span>
      </Link>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 lowercase">
            [sign in to start tossing scripts at the compiler layer]
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              // Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                <Mail size={16} className="stroke-[2.5]" />
              </span>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-3 pl-10 text-base focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition lowercase rounded-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              // Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                <KeyRound size={16} className="stroke-[2.5]" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-3 pl-10 text-base focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition rounded-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-sm font-black uppercase tracking-wider py-3.5 px-4 border-2 border-transparent transition shadow-[4px_4px_0px_0px_rgba(24,24,27,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group mt-2"
          >
            Authenticate Session
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 lowercase">
            no account yet?{" "}
            <Link to="/register" className="text-zinc-900 dark:text-white font-black hover:underline uppercase tracking-wide ml-1">
              Create One
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}