import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './CurrencyConverter.css'; 

function CurrencyConverter() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(0);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
        setExchangeRates(response.data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    handleConvert();
  }, [exchangeRates]);

  const handleConvert = () => {
    const fromRate = exchangeRates.find(rate => rate.ccy === fromCurrency);
    const toRate = exchangeRates.find(rate => rate.ccy === toCurrency);

    if (fromRate && toRate) {
      const fromValue = parseFloat(amount) / parseFloat(fromRate.buy);
      setResult(fromValue * parseFloat(toRate.sale));
    }
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <Form>
        <Form.Group controlId="amount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="fromCurrency">
          <Form.Label>From Currency:</Form.Label>
          <Form.Control as="select" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
            {exchangeRates.map(rate => (
              <option key={rate.ccy} value={rate.ccy}>{rate.ccy}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="toCurrency">
          <Form.Label>To Currency:</Form.Label>
          <Form.Control as="select" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
            {exchangeRates.map(rate => (
              <option key={rate.ccy} value={rate.ccy}>{rate.ccy}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleConvert}>Convert</Button>
      </Form>

      {result > 0 && (
        <p>{amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}</p>
      )}
    </div>
  );
}

export default CurrencyConverter;
