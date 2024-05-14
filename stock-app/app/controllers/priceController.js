import Joi from "joi";
import stockDataService from "../services/stockDataService.js";
import APIException from "../utils/APIException.js";

class PriceController {

  async getPrice(req, res, next) {
    try {
      const schema = Joi.object({
        ticker: Joi.string().required().valid("GE", "AMZN", "AAPL", "IBM"),
        from: Joi.date(),
        to: Joi.date(),
      });
      const { error, value } = schema.validate(req.query);

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        throw new APIException(422, validationErrors.join(", "));
      }

      const { ticker, from, to } = value;

      const stockData = await stockDataService.getStockData(ticker,from,to);
      res.json(stockData);
      next();
    } catch (error) {
      if(error instanceof APIException)
        return res.status(error.statusCode).send(error.message);
      console.log(error);
      res.status(500).send("An internal server error occurred.");
    }
  }
}
export default new PriceController();
