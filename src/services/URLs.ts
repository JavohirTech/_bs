const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
export const BASE_URL = `https://v6.exchangerate-api.com`;
export const EXCHANGE_RATE_API_URL = `${BASE_URL}/v6/${apiKey}/latest/UZS`;