import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("loggedIn");
    if (auth === "true") setLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-indigo-400"
        >
          StockEdge
        </Link>

        <div className="flex items-center gap-6 text-sm">

          {loggedIn && (
            <>
              <Link className="hover:text-indigo-400 transition" to="/paginated">
                Stocks
              </Link>

              <Link className="hover:text-indigo-400 transition" to="/watchlist">
                Watchlist
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-3 py-1 rounded-md bg-red-500/20 text-red-400"
              >
                Logout
              </motion.button>
            </>
          )}

          {!loggedIn && (
            <>
              <Link className="hover:text-indigo-400" to="/login">
                Login
              </Link>

              <Link
                className="px-4 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
}