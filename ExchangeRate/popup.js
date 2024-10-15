const API_KEY = 'b78cf5e436dcea32fc3d1917'; // Replace with your actual API key
const BASE_CURRENCY = 'USD';
const CURRENCIES = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

function fetchExchangeRates() {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                displayRates(data.conversion_rates);
            } else {
                document.getElementById('rates').textContent = 'Error fetching rates';
            }
        })
        .catch(error => {
            document.getElementById('rates').textContent = 'Error fetching rates';
            console.error('Error:', error);
        });
}

function displayRates(rates) {
    const ratesDiv = document.getElementById('rates');
    ratesDiv.innerHTML = '';

    CURRENCIES.forEach(currency => {
        const rate = rates[currency];
        const rateElement = document.createElement('p');
        rateElement.textContent = `${BASE_CURRENCY} to ${currency}: ${rate}`;
        ratesDiv.appendChild(rateElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchExchangeRates);