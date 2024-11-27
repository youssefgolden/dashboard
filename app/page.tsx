'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type StockData = {
  regularMarketPrice: number;
  currency: string;
  shortName: string;
};

const StockDisplay = () => {
  const [stock, setStock] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://yahoo-finance166.p.rapidapi.com/api/market/get-quote',
          {
            headers: {
              'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
              'x-rapidapi-key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31',
            },
            params: { symbols: 'ATO.PA' },
          }
        );

        const result = response.data.quoteResponse.result[0];
        setStock({
          regularMarketPrice: result.regularMarketPrice,
          currency: result.currency,
          shortName: result.shortName,
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch stock data. Please try again later.');
      }
    };

    fetchStockData();

    const interval = setInterval(fetchStockData, 10000); // Met à jour toutes les 10 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
      <div className="text-center p-6 shadow-lg rounded-md border border-gray-200 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Stock Price</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : stock ? (
          <div>
            <p className="text-lg font-medium">{stock.shortName}</p>
            <p className="text-4xl font-bold">
              {stock.regularMarketPrice} {stock.currency}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StockDisplay;
