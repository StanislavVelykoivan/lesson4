import './App.css';
import CurrencyCalculator from './components/CurrencyCalculator/CurrencyCalculator';
import CurrencyRates from './components/CurrencyConverter/CurrencyRates';

function App() {
  return (
    <div className="App">
        <CurrencyCalculator />
        <CurrencyRates />
    </div>
  );
}

export default App;
