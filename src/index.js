'use strict';

// DOM Element Selectors
const tempDisplay = document.getElementById('tempValue');
const increaseButton = document.getElementById('increaseTempControl');
const decreaseButton = document.getElementById('decreaseTempControl');
const landscape = document.getElementById('landscape');
const cityInput = document.getElementById('cityNameInput');
const cityDisplay = document.getElementById('headerCityName');

// Store the default temperature
const state = {
  temperature: 72
};

// Display the temperature
const renderTemp = () => {
  tempDisplay.textContent = state.temperature;
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

// Change the lanscape
const updateLandscape = () => {
  const temperature = state.temperature;

  if (temperature >= 80) {
    landscape.textContent = '🐍🦂🌵🐍🏜';
  } else if (temperature >= 70) {
    landscape.textContent = '🌸🌿🌼🌻🌷';
  } else if (temperature >= 60) {
    landscape.textContent = '🌾🪨🛤🌾🍃';
  } else {
    landscape.textContent = '🌲⛄️🍂⛄️🌲';
  }
};

// Update city name
const updateCityName = () => {
  cityDisplay.textContent = cityInput.value;
};

const render = () => {
  renderTemp();
  updateTemperatureColor();
  updateLandscape();
  updateCityName();
};

// Render the initial application state
render();

// Register all events
const registerEventHandlers = () => {
  increaseButton.addEventListener('click', increaseTemperature);
  decreaseButton.addEventListener('click', decreaseTemperature);
  cityInput.addEventListener('input', updateCityName);
};

// DOM listener
document.addEventListener('DOMContentLoaded', registerEventHandlers);