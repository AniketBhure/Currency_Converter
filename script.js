const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

let exchangeRates = {};

async function loadCurrencies() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    exchangeRates = data.rates;

    const currencies = Object.keys(exchangeRates);
    currencies.forEach((currency) => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    console.error("Error loading currencies:", error);
    result.innerText = "Failed to load currencies.";
  }
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt)) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const convertedAmount = (amt / exchangeRates[from]) * exchangeRates[to];
  result.innerText = `Converted Amount: ${convertedAmount.toFixed(2)} ${to}`;
}

convertBtn.addEventListener("click", convertCurrency);

loadCurrencies();
