// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import StockChart from '../components/StockChart';
import { getCurrentPrice } from '../lib/yahoofinance';

const HomePage: React.FC = () => {
  const [prices, setPrices] = useState<{ [symbol: string]: { price: number, change: number } }>({
    'ATO.PA': { price: 0, change: 0 },
    'BNP.PA': { price: 0, change: 0 },
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const atoPrice = await getCurrentPrice('ATO.PA');
        const bnpPrice = await getCurrentPrice('BNP.PA');

        // Assurez-vous que atoPrice et bnpPrice sont des nombres valides
        if (typeof atoPrice === 'number' && typeof bnpPrice === 'number') {
          // Simule un changement de pourcentage, ajustez selon vos besoins
          setPrices({
            'ATO.PA': { price: atoPrice, change: Math.random() * 10 - 5 },
            'BNP.PA': { price: bnpPrice, change: Math.random() * 10 - 5 },
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des prix des actions:', error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div>
      <h1>Dashboard des Actions en Bourse</h1>

      <div className="stock-cards">
        <StockCard symbol="ATO.PA" price={prices['ATO.PA'].price} change={prices['ATO.PA'].change} />
        <StockCard symbol="BNP.PA" price={prices['BNP.PA'].price} change={prices['BNP.PA'].change} />
      </div>

      <div className="stock-charts">
        <h2>Graphiques des Actions</h2>
        <StockChart symbol="ATO.PA" />
        <StockChart symbol="BNP.PA" />
      </div>
    </div>
  );
};

export default HomePage;
