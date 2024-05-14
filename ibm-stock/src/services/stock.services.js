import axios from "axios";

class StockService {
  source=axios
  constructor(symbol) {
    this.apiKey = process.env.API_KEY; // Replace with your actual API key
    this.source.defaults.baseURL="https://www.alphavantage.co"
    this.source.defaults.params = {
      apikey: this.apiKey,
      symbol:symbol
    };
  }
  async getStockData(function_type,target) {
    const response = await this.source(
      `/query?function=${function_type}`
    );
    const data = response.data || {};
    if(target) return data[target] || []
    return data || []
  }
  //more functions here 
}
export default StockService