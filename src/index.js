const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDesc = document.getElementById("weather-desc");
const humidityWind = document.getElementById("humidity-wind");
const emoji = document.getElementById("emoji");

const apiKey = "c7456b7eba4a091e52f74ef9260149a8";

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) return;

  // ✅ Correct OpenWeatherMap endpoint
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log("✅ API response:", data);

    // Extract data
    const cityDisplay = data.name;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = Math.round(data.wind.speed);
    const weatherIcon = data.weather[0].icon;

    // Update HTML
    cityName.textContent = cityDisplay;
    temperature.textContent = `${temp}°C`;
    weatherDesc.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    humidityWind.textContent = `Humidity: ${humidity}% | Wind: ${wind} km/h`;
    emoji.textContent = getWeatherEmoji(weatherIcon);
  } catch (error) {
    console.error("❌ Error fetching weather data:", error);
    cityName.textContent = "City not found";
    temperature.textContent = "--";
    weatherDesc.textContent = "Try again";
    humidityWind.textContent = "";
    emoji.textContent = "❌";
  }

  cityInput.value = "";
});

// 🌦️ Match weather icons to emojis
function getWeatherEmoji(icon) {
  const mapping = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "🌩️",
    "11n": "🌩️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return mapping[icon] || "🌈";
}
