// // src/components/SearchBar.jsx
// import React, { useState } from "react";

// const API_KEY = "EM3IXGLST6QAAR3Y"; // Alpha Vantage API

// export default function SearchBar({ onSelectSymbol }) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const fetchSuggestions = async (value) => {
//     if (value.length < 1) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`
//       );
//       const data = await res.json();
//       const matches = data["bestMatches"];
//       if (matches) {
//         setSuggestions(matches);
//         setShowSuggestions(true);
//       }
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     fetchSuggestions(value);
//   };

//   const handleSelect = (selectedSymbol) => {
//     onSelectSymbol(selectedSymbol); // <<< Pass to parent
//     setQuery("");
//     setSuggestions([]);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="w-full max-w-md relative mb-6">
//       <input
//         type="text"
//         className="w-full p-2 border border-gray-300 rounded"
//         placeholder="Search company (e.g. Tesla, Apple)"
//         value={query}
//         onChange={handleInputChange}
//         onFocus={() => query.length > 1 && setShowSuggestions(true)}
//         onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
//       />

//       {showSuggestions && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded shadow max-h-64 overflow-auto mt-1">
//           {suggestions.map((item, idx) => (
//             <li
//               key={idx}
//               className="p-2 hover:bg-blue-100 cursor-pointer"
//               onClick={() => handleSelect(item["1. symbol"])}
//             >
//               <strong>{item["1. symbol"]}</strong> — {item["2. name"]}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
