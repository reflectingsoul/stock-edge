import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 20;
const API_KEY = 'd0ncs8hr01qi1cvdjib0d0ncs8hr01qi1cvdjibg'; 

function PaginatedStocks() {
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSymbols = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format from API');
        }

        setStocks(data);
        setPage(1);
      } catch (err) {
        setError(err.message || 'Failed to fetch stock symbols');
      } finally {
        setLoading(false);
      }
    };
    fetchSymbols();
  }, []);

  const totalPages = Math.ceil(stocks.length / PAGE_SIZE);
  const currentStocks = stocks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        US Stocks (Page {page} of {totalPages})
      </h2>

      {loading && <p className="text-center text-blue-600 font-medium">Loading stocks...</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      {!loading && !error && (
        <>
          <ul className="divide-y divide-gray-200">
            {currentStocks.map(({ symbol, description }) => (
              <li
                key={symbol}
                className="py-3 flex justify-between items-center hover:bg-gray-100 cursor-pointer rounded px-4"
              >
                <span className="font-mono font-bold text-indigo-700">{symbol}</span>
                <span className="text-gray-600">{description}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PaginatedStocks;
