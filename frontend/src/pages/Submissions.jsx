import { useEffect, useState } from "react";
import axios from "axios";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/submissions",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Submissions
      </h1>

      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">
                  Problem
                </th>

                <th className="border px-4 py-2 text-left">
                  Verdict
                </th>

                <th className="border px-4 py-2 text-left">
                  Language
                </th>

                <th className="border px-4 py-2 text-left">
                  Submitted At
                </th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-4 py-2">
                    {sub.problemId?.title}
                  </td>

                  <td
                    className={`border px-4 py-2 font-medium ${
                      sub.verdict === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {sub.verdict}
                  </td>

                  <td className="border px-4 py-2">
                    {sub.language}
                  </td>

                  <td className="border px-4 py-2">
                    {sub.submittedAt
                      ? new Date(
                          sub.submittedAt
                        ).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}