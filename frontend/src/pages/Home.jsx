import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-6xl font-bold text-gray-900">
          CodeJudge
        </h1>

        <p className="text-xl text-gray-600 mt-6 max-w-2xl">
          Practice coding problems, compete on leaderboards,
          and test your solutions in a secure Docker-powered
          coding environment.
        </p>

        <div className="flex gap-4 mt-10">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-gray-400 px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
              Multi Language
            </h3>
            <p>
              Solve problems using Python, JavaScript and C++.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
              Docker Sandbox
            </h3>
            <p>
              Secure code execution with isolated containers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
              Leaderboards
            </h3>
            <p>
              Track rankings and compare performance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
              Real Verdicts
            </h3>
            <p>
              Get Accepted, Wrong Answer, TLE and Runtime Error results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}