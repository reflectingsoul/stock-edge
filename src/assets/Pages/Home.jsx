import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {

  return (

    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      className="space-y-16"
    >

      <div className="text-center">

        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-indigo-500">StockEdge</span>
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Track stocks, build watchlists, and explore the market with a
          modern fintech dashboard.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <Link to="/paginated">
          <motion.div
            whileHover={{ scale:1.05 }}
            className="p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-2xl font-bold mb-2">Browse Stocks</h2>
            <p className="text-gray-400">
              Explore all US stocks with smooth pagination.
            </p>
          </motion.div>
        </Link>

        <Link to="/watchlist">
          <motion.div
            whileHover={{ scale:1.05 }}
            className="p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold mb-2">Your Watchlist</h2>
            <p className="text-gray-400">
              Track your favorite stocks.
            </p>
          </motion.div>
        </Link>

      </div>

    </motion.div>
  );
}