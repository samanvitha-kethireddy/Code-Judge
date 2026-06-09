import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              My Profile
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-lg font-semibold text-gray-800">{user.username}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Submissions</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.submissionsCount ?? 0}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Accepted Solutions</p>
            <p className="text-lg font-semibold text-green-600">
              {user.acceptedSolutions ?? 0}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm col-span-2">
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              {user.successRate ? `${user.successRate}%` : "0%"}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${user.successRate || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
