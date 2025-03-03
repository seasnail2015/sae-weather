const apiUrl = "https://api.weatherstack.com/current";
const accessKey = "7b31726ec314eae5e2902e9c03b65ca3"; // Replace with your actual access key

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  
  if (city === "") {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  const fullUrl = `${apiUrl}?access_key=${accessKey}&query=${city}`;

  fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        weatherResult.textContent = "City not found. Please try again.";
      } else {
        const { temperature, weather_descriptions, humidity } = data.current;
        const {name, country} = data.location;
        weatherResult.innerHTML = `
          <strong>${city}</strong><br>
          Temperature: ${temperature}°C<br>
          Condition: ${weather_descriptions[0]}<br>
          Humidity: ${humidity}%<br>
          Name: ${name}<br>
          country: ${country}
        `;
         console.log("Data", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      weatherResult.textContent = "Something went wrong. Please try again.";
    });
});