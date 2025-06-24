import React, { useEffect, useState } from "react";

const PAGE_SIZE = 20;
const API_KEY = "d0ncs8hr01qi1cvdjib0d0ncs8hr01qi1cvdjibg";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSymbols = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
        );
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        const data = await res.json();

        console.log("this is the object we got", data
          
        )

        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format from API");
        }

        setStocks(data);
        setPage(1); // reset page on new data
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSymbols();
  }, []);

  // Filter stocks based on search term (case-insensitive)
  const filteredStocks = stocks.filter(({ symbol, description }) => {
    const term = searchTerm.toLowerCase();
    return (
      symbol.toLowerCase().includes(term) ||
      (description && description.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredStocks.length / PAGE_SIZE);
  const currentStocks = filteredStocks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page to 1 if filtered results get smaller than current page
  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filteredStocks, page, totalPages]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">US Stock Viewer</h1>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search stocks by symbol or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Page {page} of {totalPages || 1}
      </h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <ul className="border border-gray-300 rounded-md divide-y divide-gray-200">
            {currentStocks.length > 0 ? (
              currentStocks.map(({ symbol, description }) => (
                <li
                  key={symbol}
                  className="p-3 hover:bg-gray-100 flex justify-between cursor-pointer rounded"
                >
                  <span className="font-medium">{symbol}</span>
                  <span className="text-gray-600">{description}</span>
                </li>
              ))
            ) : (
              <li className="p-3 text-center text-gray-500">No stocks found.</li>
            )}
          </ul>

          {currentStocks.length > 0 && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Prev
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
