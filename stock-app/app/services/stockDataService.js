import moment from "moment";
import fs from "fs/promises";
import APIException from "../utils/APIException.js";

class StockDataService {
  async getStockData(ticker, from, to) {
    const filePath = `${process.env.DB_DIR}/${ticker}.json`;
    try {
      const data = await fs.readFile(filePath, "utf8");
      const prices = Object.entries(JSON.parse(data).time_series);
      let list = prices;
      // filter by date
      if (from || to) {
        if (!from) from = "01/01/1970"; // take min date ,Supposing earliest date is 01/01/1970
        if (!to) to = moment().format("DD/MM/YYYY"); //take current date

        list = list.filter(([date]) =>
          moment(date).isBetween(moment(from), moment(to), "day", "[]")
        );
      }
      return list.map(([date, prices]) => ({
        timestamp: date,
        close: prices["4. close"],
      }));
      
    } catch (err) {
      console.error(`Error loading data for ${ticker}:`, err);
      throw new APIException(500, "Error retrieving stock data");
    }
  }
}

export default new StockDataService();
