const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page refresh
  const city = cityInput.value.trim();

  if (city) {
    cityName.textContent = city; // update city name
  }
});
