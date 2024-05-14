import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import StockService from '../../services/stock.services';
import Chart from 'chart.js/auto';
import renderFinancialDataTable from './FinancialDataTable';

function Stock() {
  const symbol = 'IBM'; // Declare symbol here
  const [stockData, setStockData] = useState({
    incomeStatement: null,
    balanceSheet: null,
    chart:{
      labels: [],
      datasets: [{
        label: 'Stock Price',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: 'start' // Fill the area below the line
      }]
    }
  });
  const fetchData=async ()=>{
    const stockService=new StockService(symbol)
    const incomeData = await stockService.getStockData("INCOME_STATEMENT");
    const balanceData = await stockService.getStockData("BALANCE_SHEET");
    const chartData = await stockService.getStockData('TIME_SERIES_DAILY','Time Series (Daily)')
    const labels = Object.keys(chartData)
    const prices = Object.values(chartData).map(dayData => parseFloat(dayData['4. close'])).reverse();

    setStockData({
      incomeStatement: incomeData,
      balanceSheet: balanceData,
      chart:{
        labels,
        datasets: [{
          label: 'Stock Price',
          data: prices,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: 'start' // Fill the area below the line
        }]
      }
    });
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="chart-container">
      <h2>{symbol} Stock Chart</h2>
      <div className="chart-toolbar">
        {/* Add interactive elements here */}
      </div>
      <Line data={stockData.chart} /> 

      {/* Display financial data */}
      <div className="financial-data">
        {renderFinancialDataTable(stockData.incomeStatement, "Income Statement")}
        {renderFinancialDataTable(stockData.balanceSheet, "Balance Sheet")}
      </div>
    </div>
  );
}



export default Stock;
