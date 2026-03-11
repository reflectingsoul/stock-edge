import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PAGE_SIZE = 20;

export default function PaginatedStocks() {

  const [stocks,setStocks]=useState([]);
  const [page,setPage]=useState(1);

  useEffect(()=>{

    const loadStocks=async()=>{
      const res=await fetch("/stocks.json");
      const data=await res.json();
      setStocks(data);
    };

    loadStocks();

  },[]);

  const totalPages=Math.ceil(stocks.length/PAGE_SIZE);

  const current=stocks.slice(
    (page-1)*PAGE_SIZE,
    page*PAGE_SIZE
  );

  return(

    <div>

      <h2 className="text-3xl font-bold mb-8">
        Browse Stocks
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {current.map(stock=>(
          
          <motion.div
            key={stock.symbol}
            whileHover={{ scale:1.03 }}
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow"
          >

            <h3 className="text-xl font-bold text-indigo-400">
              {stock.symbol}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {stock.description}
            </p>

          </motion.div>

        ))}

      </div>

      <div className="flex justify-center gap-4 mt-10">

        <button
          onClick={()=>setPage(p=>Math.max(p-1,1))}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-gray-900 rounded">
          {page} / {totalPages}
        </span>

        <button
          onClick={()=>setPage(p=>Math.min(p+1,totalPages))}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
}