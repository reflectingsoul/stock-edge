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

function StockChart() {

  const { symbol } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchChart = async () => {

      const now = Math.floor(Date.now() / 1000);
      const weekAgo = now - 60 * 60 * 24 * 7;

      const res = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${weekAgo}&to=${now}&token=${API_KEY}`
      );

      const json = await res.json();

      if (json.c) {

        const formatted = json.c.map((price, i) => ({
          price,
          time: new Date(json.t[i] * 1000).toLocaleDateString()
        }));

        setData(formatted);

      }

    };

    fetchChart();

  }, [symbol]);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">

      <h1 className="text-3xl font-bold mb-6 text-center">
        {symbol} Price Chart
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={data}>

            <CartesianGrid stroke="#333" />

            <XAxis dataKey="time" stroke="#aaa" />

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

export default StockChart;