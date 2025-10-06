const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDesc = document.getElementById("weather-desc");
const humidityWind = document.getElementById("humidity-wind");
const emoji = document.getElementById("emoji");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

const apiKey = "d6b4c7e7dd774107e21df06d3ab93d78";

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    const cityDisplay = data.name;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = Math.round(data.wind.speed);
    const weatherIcon = data.weather[0].icon;

    cityName.textContent = cityDisplay;
    temperature.textContent = `${temp}°C`;
    weatherDesc.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    humidityWind.textContent = `Humidity: ${humidity}% | Wind: ${wind} km/h`;
    emoji.textContent = getWeatherEmoji(weatherIcon);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    cityName.textContent = "City not found";
    temperature.textContent = "--";
    weatherDesc.textContent = "Try again";
    humidityWind.textContent = "";
    emoji.textContent = "❌";
  }

  cityInput.value = "";
});

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
  const emoji = mapping[icon] || "🌈";
  return `<span style="font-size: 5rem;">${mapping[icon] || "🌈"}</span>`;
}

function updateDateTime() {
  const now = new Date();

  const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: "long" });

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  dateEl.textContent = dayFormatter.format(now);
  timeEl.textContent = timeFormatter.format(now);
}

updateDateTime();
setInterval(updateDateTime, 1000);
