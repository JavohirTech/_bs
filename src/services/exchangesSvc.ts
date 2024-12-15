import axios from "axios";
import {EXCHANGE_RATE_API_URL} from "./URLs.ts";

export const getExchanges = async () => {
  try {
    const {data} = await axios.get(EXCHANGE_RATE_API_URL)
    return data.conversion_rates;
  } catch (error) {
    console.error(error)
  }
}