import React, { useEffect, useState } from "react";
import axios from "axios";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Customer Feedback</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600">No feedback submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Message</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb.id} className="text-center">
                  <td className="py-2 px-4 border">{fb.name}</td>
                  <td className="py-2 px-4 border">{fb.email}</td>
                  <td className="py-2 px-4 border">{fb.message}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <a
                      href={`mailto:${fb.email}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => deleteFeedback(fb.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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

export default Feedback;
