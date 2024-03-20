import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function CurrencyRates() {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await axios.get('https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014');
        setExchangeRates(response.data.exchangeRate);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchExchangeRates();
  }, []);

  return (
    <div>
      <h2>Currency Rates</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase Rate</th>
            <th>Sale Rate</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.currency}</td>
              <td>{rate.purchaseRateNB}</td>
              <td>{rate.saleRateNB}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CurrencyRates;
