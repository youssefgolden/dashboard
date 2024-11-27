'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStockData } from '../lib/yahoofinance';

interface StockChartProps {
  symbol: string;
}

// Définir un type pour les données du graphique
interface ChartData {
  date: string;
  price: number;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [data, setData] = useState<ChartData[]>([]); // Utilisation du type ChartData
  
  useEffect(() => {
    const fetchData = async () => {
      const { timestamps, prices } = await getStockData(symbol);

      // Map des données de l'API vers un format utilisé par recharts
      const chartData: ChartData[] = timestamps.map((date, index) => ({
        date,
        price: prices[index],
      }));
      
      setData(chartData); // Mettre à jour les données
    };

    fetchData();
  }, [symbol]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
