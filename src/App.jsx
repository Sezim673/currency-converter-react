import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = "https://open.er-api.com/v6/latest/USD";

const currencyFlags = {
  'AED': '🇦🇪', 'AFN': '🇦🇫', 'ALL': '🇦🇱', 'AMD': '🇦🇲', 'ANG': '🇳🇱', 'AOA': '🇦🇴', 'ARS': '🇦🇷', 'AUD': '🇦🇺', 'AWG': '🇦🇼', 'AZN': '🇦🇿',
  'BAM': '🇧🇦', 'BBD': '🇧🇧', 'BDT': '🇧🇩', 'BGN': '🇧🇬', 'BHD': '🇧🇭', 'BIF': '🇧🇮', 'BMD': '🇧🇲', 'BND': '🇧🇳', 'BOB': '🇧🇴', 'BRL': '🇧🇷', 'BSD': '🇧🇸', 'BTN': '🇧🇹', 'BWP': '🇧🇼', 'BYN': '🇧🇾', 'BZD': '🇧🇿',
  'CAD': '🇨🇦', 'CDF': '🇨🇩', 'CHF': '🇨🇭', 'CLP': '🇨🇱', 'CNY': '🇨🇳', 'COP': '🇨🇴', 'CRC': '🇨🇷', 'CUP': '🇨🇺', 'CVE': '🇨🇻', 'CZK': '🇨🇿',
  'DJF': '🇩🇯', 'DKK': '🇩🇰', 'DOP': '🇩🇴', 'DZD': '🇩🇿', 'EGP': '🇪🇬', 'ERN': '🇪🇷', 'ETB': '🇪🇹', 'EUR': '🇪🇺',
  'FJD': '🇫🇯', 'FKP': '🇫🇰', 'FOK': '🇫🇴', 'GBP': '🇬🇧', 'GEL': '🇬🇪', 'GGP': '🇬🇬', 'GHS': '🇬🇭', 'GIP': '🇬🇮', 'GMD': '🇬🇲', 'GNF': '🇬🇳', 'GTQ': '🇬🇹', 'GYD': '🇬🇾',
  'HKD': '🇭🇰', 'HNL': '🇭🇳', 'HRK': '🇭🇷', 'HTG': '🇭🇹', 'HUF': '🇭🇺',
  'IDR': '🇮🇩', 'ILS': '🇮🇱', 'IMP': '🇮🇲', 'INR': '🇮🇳', 'IQD': '🇮🇶', 'IRR': '🇮🇷', 'ISK': '🇮🇸',
  'JEP': '🇯🇪', 'JMD': '🇯🇲', 'JOD': '🇯🇴', 'JPY': '🇯🇵',
  'KES': '🇰🇪', 'KGS': '🇰🇬', 'KHR': '🇰🇭', 'KID': '🇰🇮', 'KMF': '🇰🇲', 'KRW': '🇰🇷', 'KWD': '🇰🇼', 'KYD': '🇰🇾', 'KZT': '🇰🇿',
  'LAK': '🇱🇦', 'LBP': '🇱🇧', 'LKR': '🇱🇰', 'LRD': '🇱🇷', 'LSL': '🇱🇸', 'LYD': '🇱🇾',
  'MAD': '🇲🇦', 'MDL': '🇲🇩', 'MGA': '🇲🇬', 'MKD': '🇲🇰', 'MMK': '🇲🇲', 'MNT': '🇲🇳', 'MOP': '🇲🇴', 'MRU': '🇲🇷', 'MUR': '🇲🇺', 'MVR': '🇲🇻', 'MWK': '🇲🇼', 'MXN': '🇲🇽', 'MYR': '🇲🇾', 'MZN': '🇲🇿',
  'NAD': '🇳🇦', 'NGN': '🇳🇬', 'NIO': '🇳🇮', 'NOK': '🇳🇴', 'NPR': '🇳🇵', 'NZD': '🇳🇿',
  'OMR': '🇴🇲',
  'PAB': '🇵🇦', 'PEN': '🇵🇪', 'PGK': '🇵🇬', 'PHP': '🇵🇭', 'PKR': '🇵🇰', 'PLN': '🇵🇱', 'PYG': '🇵🇾',
  'QAR': '🇶🇦',
  'RON': '🇷🇴', 'RSD': '🇷🇸', 'RUB': '🇷🇺', 'RWF': '🇷🇼',
  'SAR': '🇸🇦', 'SBD': '🇸🇧', 'SCR': '🇸🇨', 'SDG': '🇸🇩', 'SEK': '🇸🇪', 'SGD': '🇸🇬', 'SHP': '🇸🇭', 'SLE': '🇸🇱', 'SLL': '🇸🇱', 'SOS': '🇸🇴', 'SRD': '🇸🇷', 'SSP': '🇸🇸', 'STN': '🇸🇹', 'SYP': '🇸🇾', 'SZL': '🇸🇿',
  'THB': '🇹🇭', 'TJS': '🇹🇯', 'TMT': '🇹🇲', 'TND': '🇹🇳', 'TOP': '🇹🇴', 'TRY': '🇹🇷', 'TTD': '🇹🇹', 'TVD': '🇹🇻', 'TWD': '🇹🇼', 'TZS': '🇹🇿',
  'UAH': '🇺🇦', 'UGX': '🇺🇬', 'USD': '🇺🇸', 'UYU': '🇺🇾', 'UZS': '🇺🇿',
  'VES': '🇻🇪', 'VND': '🇻🇳', 'VUV': '🇻🇺',
  'WST': '🇼🇸', 'YER': '🇾🇪', 'ZAR': '🇿🇦', 'ZMW': '🇿🇲', 'ZWL': '🇿🇼'
};

function App() {
  // Состояния (State) — заменяют переменные и document.getElementById
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("");
  const [rateInfo, setRateInfo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Функция для получения флага
  const getFlag = (code) => currencyFlags[code] || '🌐';

  // Загружаем список валют при первом запуске
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.result === "success") {
          setCurrencies(Object.keys(data.rates).sort());
        }
      })
      .catch(() => setError("Не удалось загрузить валюты"));
  }, []);

  const handleConvert = async (e) => {
    e.preventDefault();
    setError("");
    
    if (amount <= 0) return setError("Введите сумму больше 0");
    if (from === to) return setError("Выберите разные валюты");

    setLoading(true);
    setResult("Конвертация...");

    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const rates = data.rates;

      const amountInUSD = amount / rates[from];
      const convertedResult = amountInUSD * rates[to];
      const currentRate = rates[to] / rates[from];

      setResult(`${Number(amount).toFixed(2)} ${getFlag(from)} ${from} = ${convertedResult.toFixed(2)} ${getFlag(to)} ${to}`);
      setRateInfo(`Course: 1 ${getFlag(from)} ${from} = ${currentRate.toFixed(4)} ${getFlag(to)} ${to} (updated: ${data.time_last_update_utc})`);
    } catch (err) {
      setError("Ошибка при загрузке курса");
    } finally {
      setLoading(false);
    }
  };

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setResult(""); // Сбрасываем старый результат
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>

      <form onSubmit={handleConvert}>
        <div className="row">
          <div className="row inline">
            <div className="field">
              <label>From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {currencies.map(code => (
                  <option key={code} value={code}>{getFlag(code)} {code}</option>
                ))}
              </select>
            </div>

            <button type="button" id="swap" onClick={swap} title="Поменять местами">⇄</button>

            <div className="field">
              <label>To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                {currencies.map(code => (
                  <option key={code} value={code}>{getFlag(code)} {code}</option>
                ))}
              </select>
            </div>
          </div>

          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Converting...' : 'convert'}
        </button>
      </form>

      <div className="result">
        {result || 'Enter the data and click "Convert"'}
      </div>

      {rateInfo && <div className="rate-info">{rateInfo}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;