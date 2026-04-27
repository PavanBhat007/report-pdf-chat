import React, { useState } from "react";

const Query = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.answer);
    } catch {
      setResponse("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col">
      <h2 className="text-lg font-medium mb-4">Ask Questions</h2>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. What is the total amount?"
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        rows={4}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {response && (
        <div className="mt-6 border-t pt-4 text-sm">
          <p className="text-gray-500 mb-1">Answer</p>
          <p className="text-gray-800 whitespace-pre-wrap">
            {response}
          </p>
        </div>
      )}
    </div>
  );
};

export default Query;