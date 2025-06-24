import React from 'react';

import StockCard from "./assets/Components/StockCard";
import Home from './assets/Pages/Home';
// import PaginatedStocks from "./assets/Pages/PaginatedStocks";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* <PaginatedStocks /> */}
      <Home />
    </div>
  );
}

export default App;
