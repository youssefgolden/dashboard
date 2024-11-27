"use client"

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, TimeScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, TimeScale);

const StockDisplay = () => {
  const [stock, setStock] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Fetch stock price data
        const stockResponse = await axios.get(
          'https://yahoo-finance166.p.rapidapi.com/api/market/get-quote',
          {
            headers: {
              'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
              'x-rapidapi-key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31',
            },
            params: { symbols: 'ATO.PA' },
          }
        );

        const stockData = stockResponse.data.quoteResponse.result[0];
        setStock({
          price: stockData.regularMarketPrice,
          currency: stockData.currency,
          shortName: stockData.shortName,
        });
        setError(null);

        // Fetch historical stock data for the chart (30 days)
        const chartResponse = await axios.get(
          'https://yahoo-finance166.p.rapidapi.com/api/market/get-historical',
          {
            headers: {
              'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
              'x-rapidapi-key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31',
            },
            params: { symbols: 'ATO.PA', range: '30d' },
          }
        );

        const chartData = chartResponse.data.chart.result[0];
        const timestamps = chartData.timestamp.map((time: number) => new Date(time * 1000).toLocaleDateString());
        const prices = chartData.indicators.quote[0].close;

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Prix de l\'action (30 jours)',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });
      } catch (err) {
        setError('Échec de la récupération des données boursières.');
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 mb-8">
        <h1 className="text-xl font-bold mb-4">{stock ? stock.shortName : 'Chargement...'}</h1>
        <p className="text-2xl font-semibold">
          {stock ? `${stock.price} ${stock.currency}` : 'Chargement du prix...'}
        </p>
      </div>

      {chartData ? (
        <div className="w-full md:w-3/4 lg:w-1/2">
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Évolution des 30 derniers jours' },
            },
            scales: {
              x: { 
                type: 'time',
                time: {
                  unit: 'day', // Montre une unité de jour
                  tooltipFormat: 'll', // Format pour l'outil de survol
                },
                title: { display: true, text: 'Date' },
                ticks: { autoSkip: true, maxTicksLimit: 10 },
              },
              y: {
                title: { display: true, text: 'Prix (en €)' },
                ticks: {
                  // L'option beginAtZero est retirée, Chart.js gère automatiquement l'échelle des prix
                  suggestedMin: Math.min(...chartData.datasets[0].data) * 0.95, // Ajuster légèrement en dessous du minimum pour un meilleur rendu
                  suggestedMax: Math.max(...chartData.datasets[0].data) * 1.05, // Ajuster légèrement au-dessus du maximum pour un meilleur rendu
                },
              },
            },
          }} />
        </div>
      ) : (
        <div className="text-gray-500">Chargement du graphique...</div>
      )}
    </div>
  );
};

export default StockDisplay;
