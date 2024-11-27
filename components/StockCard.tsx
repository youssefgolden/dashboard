// components/StockCard.tsx
import React from 'react';

interface StockCardProps {
  symbol: string;
  price: number;
  change: number;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, change }) => {
  return (
    <div className="stock-card">
      <h2>{symbol}</h2>
      <p>Prix: {price} €</p>
      <p>Variation: {change}%</p>
    </div>
  );
};

export default StockCard;
