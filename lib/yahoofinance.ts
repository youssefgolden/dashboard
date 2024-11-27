// lib/yahooFinance.ts
import axios from 'axios';
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
          'X-RapidAPI-Key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31'
        }
      });
  
      // Affichez la réponse pour déboguer
      console.log(response.data);
  
      // Vérifiez si la réponse contient les données attendues
      const data = response.data.chart.result[0];
      const timestamps = data.timestamp.map((timestamp: number) => new Date(timestamp * 1000).toLocaleDateString());
      const prices = data.indicators.quote[0].close;
  
      return { timestamps, prices };
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      return { timestamps: [], prices: [] };
    }
  };
  