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

  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherApiUrl),
      axios.get(forecastApiUrl),
    ]);

    const currentWeatherData = currentWeatherResponse.data;
    const forecastData = forecastResponse.data;

    const cityDisplay = currentWeatherData.name;
    const temp = Math.round(currentWeatherData.main.temp);
    const description = currentWeatherData.weather[0].description;
    const humidity = currentWeatherData.main.humidity;
    const wind = Math.round(currentWeatherData.wind.speed);
    const weatherIcon = currentWeatherData.weather[0].icon;

    cityName.textContent = cityDisplay;
    temperature.textContent = `${temp}°C`;
    weatherDesc.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    humidityWind.textContent = `Humidity: ${humidity}% | Wind: ${wind} km/h`;
    emoji.innerHTML = getWeatherEmoji(weatherIcon);

    updateForecast(forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    cityName.textContent = "City not found";
    temperature.textContent = "--";
    weatherDesc.textContent = "Try again";
    humidityWind.textContent = "";
    emoji.innerHTML = `<span style="font-size: 5rem;">❌</span>`;
    document.getElementById("forecast").innerHTML = "";
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
  return `<span style="font-size: 5rem;">${mapping[icon] || "🌈"}</span>`;
}

function updateForecast(forecastData) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = ""; // Clear existing forecast

  // Filter forecast data to get one entry per day at 12:00 PM
  const dailyForecast = forecastData.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  dailyForecast.forEach((item) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    const dayName = document.createElement("p");
    dayName.classList.add("day-name");
    const date = new Date(item.dt * 1000);
    dayName.textContent = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    const dayTemp = document.createElement("p");
    dayTemp.classList.add("day-temp");
    dayTemp.textContent = `${Math.round(item.main.temp)}°C`;

    dayDiv.appendChild(dayName);
    dayDiv.appendChild(dayTemp);
    forecastContainer.appendChild(dayDiv);
  });
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
