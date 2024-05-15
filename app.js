document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const weatherContainer = document.getElementById('weatherContainer');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cityInput = document.getElementById('cityInput').value.trim();

        try {
            const weatherData = await getWeatherData(cityInput);

            // Clear previous results
            weatherContainer.innerHTML = '';

            // Display weather information
            const weatherInfo = createWeatherInfo(weatherData);
            weatherContainer.appendChild(weatherInfo);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Ciudad no encontrada. Por favor intente nuevamente.');
        }
    });
});

async function getWeatherData(city) {
    const apiKey = 'a4292d19f204729dc2e74b6b5b11eb87';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Ciudad no encontrada');
    }

    const weatherData = await response.json();
    return weatherData;
}

function createWeatherInfo(weatherData) {
    const { name, main, weather } = weatherData;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    const weatherInfoContainer = document.createElement('div');

    const cityNameElement = document.createElement('h2');
    cityNameElement.textContent = name;

    const temperatureElement = document.createElement('p');
    temperatureElement.innerHTML = `Temperatura: ${temperature} &deg;C`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Clima: ${weatherDescription}`;

    const iconElement = document.createElement('img');
    iconElement.src = iconUrl;
    iconElement.alt = weatherDescription;

    weatherInfoContainer.appendChild(cityNameElement);
    weatherInfoContainer.appendChild(temperatureElement);
    weatherInfoContainer.appendChild(descriptionElement);
    weatherInfoContainer.appendChild(iconElement);

    return weatherInfoContainer;
}
