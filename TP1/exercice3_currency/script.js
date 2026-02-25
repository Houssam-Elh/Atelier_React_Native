const API_BASE = 'https://api.exchangerate-api.com/v4/latest/';
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const converterForm = document.getElementById('converter-form');
const resultText = document.getElementById('result-text');
const rateText = document.getElementById('rate-text');
const statusMessage = document.getElementById('status-message');

let exchangeRates = {};

// Charger les devises initiales (basées sur USD par défaut)
async function fetchCurrencies() {
    try {
        const response = await fetch(`${API_BASE}USD`);
        const data = await response.json();
        exchangeRates = data.rates;
        const currencies = Object.keys(exchangeRates);

        populateSelects(currencies);

        // Valeurs par défaut
        fromSelect.value = 'USD';
        toSelect.value = 'EUR';
    } catch (error) {
        showStatus('Erreur lors du chargement des devises', 'error');
    }
}

function populateSelects(currencies) {
    currencies.forEach(currency => {
        const optionFrom = new Option(currency, currency);
        const optionTo = new Option(currency, currency);
        fromSelect.add(optionFrom);
        toSelect.add(optionTo);
    });
}

// Effectuer la conversion
async function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount)) return;

    try {
        // Pour être précis, on récupère les derniers taux de la devise 'from'
        const response = await fetch(`${API_BASE}${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const result = (amount * rate).toFixed(2);

        resultText.textContent = `${amount} ${from} = ${result} ${to}`;
        rateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    } catch (error) {
        showStatus('Erreur lors de la conversion', 'error');
    }
}

converterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    convert();
});

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = type;
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = '';
    }, 3000);
}

// Initialisation
fetchCurrencies();
