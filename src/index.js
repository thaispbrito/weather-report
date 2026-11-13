'use strict';

const DEFAULT_CITY_NAME = 'Seattle';

const skyOptions = {
  Sunny: '☁️ ☁️ ☀️ ☁️ ☁️',
  Cloudy: '☁️ ☁️ 🌤 ☁️ ☁️',
  Rainy: '🌈 🌧 💧 🌦 🌈',
  Snowy: '❄️ 🌨 ❄️ 🌨 ❄️',
};

const landscapeOptions = {
  hot: '🐍 🦂 🌵 🐍 🏜',
  warm: '🌸 🌿 🌼 🌻 🌷',
  mild: '🌾 🪨 🛤 🌾 🍃',
  cold: '🌲 ⛄️ 🍂 ⛄️ 🌲',
};

// Define the application's default state
const state = {
  city: DEFAULT_CITY_NAME,
  temperature: 72,
  sky: 'Sunny',
};

// DOM Element Selectors
const tempDisplay = document.getElementById('tempValue');
const increaseButton = document.getElementById('increaseTempControl');
const decreaseButton = document.getElementById('decreaseTempControl');
const landscape = document.getElementById('landscape');
const cityInput = document.getElementById('cityNameInput');
const cityDisplay = document.getElementById('headerCityName');
const currentTempButton = document.getElementById('currentTempButton');
const skySelect = document.getElementById('skySelect');
const skyContainer = document.getElementById('sky');
const resetButton = document.getElementById('cityNameReset');

// Display the city
const renderCity = () => {
  cityInput.value = state.city;
  cityDisplay.textContent = state.city;
};

// Display the temperature
const renderTemp = () => {
  tempDisplay.textContent = state.temperature;
};

// Display the sky
const renderSky = () => {
  skySelect.value = state.sky;
  skyContainer.textContent = skyOptions[state.sky];
};

// Increase temperature by 1
const increaseTemperature = () => {
  state.temperature += 1;
  renderTemp();
  updateTemperatureColor();
  updateLandscape();
};

// Decrease temperature by 1
const decreaseTemperature = () => {
  state.temperature -= 1;
  renderTemp();
  updateTemperatureColor();
  updateLandscape();
};

// Change temperature color
const updateTemperatureColor = () => {
  const temperature = state.temperature;

  if (temperature >= 80) {
    tempDisplay.className = 'red';
  } else if (temperature >= 70) {
    tempDisplay.className = 'orange';
  } else if (temperature >= 60) {
    tempDisplay.className = 'yellow';
  } else if (temperature >= 50) {
    tempDisplay.className = 'green';
  } else {
    tempDisplay.className = 'teal';
  }
};

// Change the landscape
const updateLandscape = () => {
  const temperature = state.temperature;
  let landscapeType;

  if (temperature >= 80) {
    landscapeType = 'hot';
  } else if (temperature >= 70) {
    landscapeType = 'warm';
  } else if (temperature >= 60) {
    landscapeType = 'mild';
  } else {
    landscapeType = 'cold';
  }

  landscape.textContent = landscapeOptions[landscapeType];
};

// Update city name
const updateCityName = () => {
  state.city = cityInput.value;
  renderCity();
};

// Update sky
const updateSky = () => {
  state.sky = skySelect.value;
  renderSky();
};

// Reset the city name
const resetCityName = () => {
  state.city = DEFAULT_CITY_NAME;
  renderCity();
};

const render = () => {
  renderTemp();
  renderCity();
  renderSky();
  updateTemperatureColor();
  updateLandscape();
};

// Render the initial application state
render();

// Register all events
const registerEventHandlers = () => {
  increaseButton.addEventListener('click', increaseTemperature);
  decreaseButton.addEventListener('click', decreaseTemperature);
  cityInput.addEventListener('input', updateCityName);
  currentTempButton.addEventListener('click', getCurrentTemp);
  skySelect.addEventListener('change', updateSky);
  resetButton.addEventListener('click', resetCityName);
};

// DOM listener
document.addEventListener('DOMContentLoaded', registerEventHandlers);



// Calling APIs

// Flask proxy server
// const API_BASE_URL = 'https://ada-weather-report-proxy-server.onrender.com';
const API_BASE_URL = 'http://127.0.0.1:5000';

// Input: query: string
// Returns: Promise<{ latitude: string, longitude: string}>
const getLatitudeAndLongitude = async query => {
  try {
    const response = await axios.get(`${API_BASE_URL}/location`,
      {
        params: {
          q: query
        }
      });

    const { lat: latitude, lon: longitude } = response.data[0];
    return { latitude, longitude };
  } catch (error) {
    console.log(`getLatitudeAndLongitude: ${error}`);
    throw error;
  }
};

// Input: latitude: string, longitude: string
// Returns: Promise containing the current weather response
const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`,
      {
        params: {
          lat: latitude,
          lon: longitude
        }
      });

    return response.data;
  } catch (error) {
    console.log(`getWeather: ${error}`);
    throw error;
  }
};

// Input: query: string
// Returns: Promise containing the current weather response
const getWeatherFromQuery = async query => {
  try {
    const { latitude, longitude } = await getLatitudeAndLongitude(query);
    return getWeather(latitude, longitude);
  } catch (error) {
    console.log(`getWeatherFromQuery: ${error}`);
    throw error;
  }
};

// Get Realtime Temperature
const getCurrentTemp = async () => {
  const city = state.city;

  try {
    const weather = await getWeatherFromQuery(city);
    const tempInKelvin = weather.main.temp;
    const tempInFahrenheit = (tempInKelvin - 273.15) * (9 / 5) + 32;

    state.temperature = Math.round(tempInFahrenheit);
    render();

  } catch (error) {
    console.log(`Failed to get the current temperature: ${error}`);
  }
};