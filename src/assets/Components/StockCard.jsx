import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const API_KEY = "d6ot1d9r01qk3chi2370d6ot1d9r01qk3chi237g";

export default function StockChart() {

  const { symbol } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchChart = async () => {

      try {

        const now = Math.floor(Date.now() / 1000);
        const weekAgo = now - 60 * 60 * 24 * 7;

        const res = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${weekAgo}&to=${now}&token=${API_KEY}`
        );

        const json = await res.json();

        // Finnhub error check
        if (json.s !== "ok") {
          setError("No chart data available for this stock.");
          setLoading(false);
          return;
        }

        const formatted = json.c.map((price, i) => ({
          price,
          date: new Date(json.t[i] * 1000).toLocaleDateString()
        }));

        setData(formatted);

      } catch (err) {
        setError("Failed to load chart data.");
      }

      setLoading(false);

    };

    fetchChart();

  }, [symbol]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-400">
        Loading chart...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-400">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 text-white">

      <h1 className="text-3xl font-bold text-center mb-6">
        {symbol} Price Chart
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={data}>

            <CartesianGrid stroke="#333" />

            <XAxis dataKey="date" stroke="#aaa" />

            <YAxis stroke="#aaa" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}