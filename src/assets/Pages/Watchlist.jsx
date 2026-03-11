import React, { useEffect, useState } from "react";

export default function Watchlist() {

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {

    const saved = localStorage.getItem("watchlist");

    if (saved) {
      setWatchlist(JSON.parse(saved));
    }

  }, []);

  if (watchlist.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Your watchlist is empty.
      </div>
    );
  }

  return (

    <div className="max-w-5xl mx-auto mt-10 bg-gray-900 p-6 rounded-xl text-white">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Watchlist ⭐
      </h2>

      <ul className="divide-y divide-gray-700">

        {watchlist.map((stock) => (

          <li
            key={stock.symbol}
            className="flex justify-between items-center py-4 px-3"
          >

            <div>

              <p className="font-bold text-indigo-400">
                {stock.symbol}
              </p>

              <p className="text-gray-400 text-sm">
                {stock.description}
              </p>

            </div>

          </li>

        ))}

      </ul>

    </div>

  );
}