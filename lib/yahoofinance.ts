// lib/yahooFinance.ts
import axios from 'axios';

// Fonction pour récupérer les valeurs des 30 derniers jours d'une action
export const getStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`https://yahoo-finance2.p.rapidapi.com/stock/v3/get-chart`, {
      params: {
        symbol: symbol,
        range: '30d',
        interval: '1d'
      },
      headers: {
        'X-RapidAPI-Host': 'yahoo-finance2.p.rapidapi.com',
        'X-RapidAPI-Key': 'VOTRE_API_KEY' // Remplacez par votre clé API
      }
    });

    const data = response.data.chart.result[0];
    const timestamps = data.timestamp.map((timestamp: number) => new Date(timestamp * 1000).toLocaleDateString());
    const prices = data.indicators.quote[0].close;

    return { timestamps, prices };
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    return { timestamps: [], prices: [] };
  }
};
