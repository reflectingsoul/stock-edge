import React from 'react';

function StockCard({ symbol, name, price, change }) {
  return (
    <div className={`stock-card ${change < 0 ? 'loss' : 'gain'}`}>
      <h3>{name} ({symbol})</h3>
      <p>Price: ${price}</p>
      <p>Change: {change}%</p>
    </div>
  );
}

export default StockCard;
