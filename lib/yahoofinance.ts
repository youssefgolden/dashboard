import axios from 'axios';

interface StockData {
  timestamps: string[];  // Tableau de chaînes représentant les dates
  prices: number[];      // Tableau de nombres représentant les prix
}

export const getStockData = async (symbol: string): Promise<StockData> => {
  try {
    const response = await axios.get('https://yahoo-finance2.p.rapidapi.com/stock/v3/get-chart', {
      params: {
        symbol: symbol,
        range: '30d',
        interval: '1d',
      },
      headers: {
        'X-RapidAPI-Host': 'yahoo-finance2.p.rapidapi.com',
        'X-RapidAPI-Key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31',
      },
    });

    const data = response.data.chart.result[0];
    const timestamps = data.timestamp.map((timestamp: number) =>
      new Date(timestamp * 1000).toLocaleDateString()
    );
    const prices = data.indicators.quote[0].close;

    return { timestamps, prices };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.error('Trop de requêtes envoyées, veuillez attendre un peu.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Attendre 10 secondes
        return getStockData(symbol); // Réessayer la requête
      }
      console.error('Erreur Axios:', error.response?.status, error.message);
    } else {
      console.error('Erreur inconnue:', error);
    }
    return { timestamps: [], prices: [] }; // Retourner des données vides en cas d'erreur
  }
};

export const getCurrentPrice = async (symbol: string): Promise<number> => {
  try {
    const response = await axios.get('https://yahoo-finance2.p.rapidapi.com/stock/v2/get-summary', {
      params: { symbol: symbol },
      headers: {
        'X-RapidAPI-Host': 'yahoo-finance2.p.rapidapi.com',
        'X-RapidAPI-Key': 'f1929fd61dmsh32fbc48c51c2f09p137829jsn22da5cc73b31',
      },
    });

    const price = response.data.price.regularMarketPrice.raw; // Récupère le prix actuel de l'action
    return price;
  } catch (error) {
    console.error('Erreur lors de la récupération du prix actuel', error);
    return 0; // En cas d'erreur, retourne 0 comme prix
  }
};
