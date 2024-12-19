document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const apiKey = '0e76b557f1fce022b3620217b90f527b'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    if (data.cod === '404') {
        alert('Location not found');
        return;
    }

    const city = data.name;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    document.getElementById('city').textContent = `Weather in ${city}`;
    document.getElementById('description').textContent = `Condition: ${description}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
}
