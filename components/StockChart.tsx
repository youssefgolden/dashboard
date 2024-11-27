// components/StockChart.tsx
'use client'; 

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStockData } from '../lib/yahoofinance';

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { timestamps, prices } = await getStockData(symbol);
      const chartData = timestamps.map((date: string, index: number) => ({
        date,
        price: prices[index]
      }));
      setData(chartData);
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
