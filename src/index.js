// Wave 2: temperature controls
"use strict";
// Store the current temperature 
const state = {
    temperature: 72
};
// Display the temperature
const tempDisplay = document.querySelector("#tempValue");
tempDisplay.textContent = state.temperature;
// Increase temperature by 1
const increaseTemperature = () => {
    state.temperature += 1;
    tempDisplay.textContent = state.temperature;
    updateTemperatureColor();
    updateLandscape();
};
// Increase button works
const increaseButton = document.querySelector("#increaseTempControl");
increaseButton.addEventListener("click", increaseTemperature);
// Decrease temperature by 1
const decreaseTemperature = () => {
    state.temperature -= 1;
    tempDisplay.textContent = state.temperature;
    updateTemperatureColor();
    updateLandscape();
};
// Decrease button works
const decreaseButton = document.querySelector("#decreaseTempControl");
decreaseButton.addEventListener("click", decreaseTemperature);
// Change temperature color
const updateTemperatureColor = () => {
    const temperature = state.temperature;
    
    if (temperature >= 80) {
        tempDisplay.className = "temp-hot";
    } else if (temperature >= 70) {
        tempDisplay.className = "temp-warm";
    } else if (temperature >= 60) {
        tempDisplay.className = "temp-mild";
    } else if (temperature >= 50) {
        tempDisplay.className = "temp-cool";
    } else {
        tempDisplay.className = "temp-cold";
    }
};
// Show the color when the page loads
updateTemperatureColor();
// Find the landscape
const landscape = document.querySelector("#landscape");
// Change the lanscape 
const updateLandscape = () => {
    const temperature = state.temperature;

    if (temperature >= 80) {
        landscape.textContent = "🌵🐍🦂🏜🦂";
    } else if (temperature >= 70) {
        landscape.textContent = "🌸🌿🌼🌷🌻";
    } else if (temperature >= 60) {
        landscape.textContent = "🍃🪨🛤🌾🍃";
    } else {
        landscape.textContent = "🌲⛄️🍂🌲🍁";
    }
};
// Show the landscape 
updateLandscape();

// Wave 3: City name
// City input
const cityInput = document.querySelector("#cityNameInput");
// City display
const cityDisplay = document.querySelector("#headerCityName");
// Update city name
const updateCityName = () => {
    cityDisplay.textContent = cityInput.value;

};
// City name changes
cityInput.addEventListener("input", updateCityName);
// Show the city name
updateCityName();