// app/page.tsx
import React from 'react';
import StockCard from '../components/StockCard';
import StockChart from '../components/StockChart';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Dashboard des Actions en Bourse</h1>

      <div className="stock-cards">
        <StockCard symbol="ATO.SA" price={123.45} change={2.3} />
        <StockCard symbol="LVMH.PA" price={789.10} change={1.5} />
        <StockCard symbol="TOTF.PA" price={45.67} change={-0.5} />
        <StockCard symbol="BNP.PA" price={56.78} change={0.8} />
      </div>

      <div className="stock-charts">
        <h2>Graphiques des Actions</h2>
        <StockChart symbol="ATO.SA" />
        <StockChart symbol="LVMH.PA" />
        <StockChart symbol="TOTF.PA" />
        <StockChart symbol="BNP.PA" />
      </div>
    </div>
  );
};

export default HomePage;
