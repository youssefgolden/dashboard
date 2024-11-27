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
      <h3>{symbol}</h3>
      <p>Prix actuel: {price} €</p>
      <p>Changement: {change.toFixed(2)}%</p>
    </div>
  );
};

export default StockCard;
