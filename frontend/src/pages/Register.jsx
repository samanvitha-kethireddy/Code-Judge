import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Code2, ArrowRight } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed. Try a different username or email.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] bg-size-[20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="w-full max-w-md bg-stone-50 dark:bg-zinc-950 border-4 border-zinc-900 dark:border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#18181b] dark:shadow-[8px_8px_0px_0px_#000] z-10 relative">
        
        <div className="flex flex-col items-center mb-8 text-center select-none">
          <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase mb-8 z-10 relative select-none">
        <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
          <Code2 size={18} className="stroke-[2.5]" />
        </span>
        <span>BITCRUSH <span className="text-xs text-red-500">❤️‍🔥</span></span>
      </Link>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Initialize Account
          </h1>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-2 lowercase">
            [create your dev profile credentials to join challenges]
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              // Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="coder_404"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-3 text-base focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition rounded-none font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              // Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-3 text-base focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition rounded-none font-medium lowercase"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              // Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-stone-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-800 p-3 text-base focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition rounded-none font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 py-3.5 rounded-none font-black text-sm uppercase tracking-wider transition border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(24,24,27,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group mt-2"
          >
            Create Account
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>
        </form>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-8 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 lowercase">
          already holding credentials?{" "}
          <Link to="/login" className="text-zinc-900 dark:text-white font-black hover:underline uppercase tracking-wide ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}