// ========== CONFIGURATION ==========
const API_KEY = "e2c9966b2a23cdeedc3bffdce93af063"; // Your OpenWeather API key

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

// ========== DOM ELEMENTS ==========
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const saveBtn = document.getElementById("saveBtn");
const resultCard = document.getElementById("result");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const favoritesList = document.getElementById("favoritesList");

// ========== SEARCH WEATHER ==========
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    console.log(city);
    if (!city) return alert("Please enter a city name");

    fetch(`${API_URL}${city}&appid=${API_KEY}&units=metric`)

        .then(response => response.json())
        .then(data => {
            console.log(data); // For debugging
            if (data.cod && data.cod !== 200) {
                alert("City not found!");
                resultCard.classList.add("d-none");
                saveBtn.disabled = true;
                return;
            }

            // Show result
            resultCard.classList.remove("d-none");
            cityName.textContent = `${data.name}`;
            temp.textContent = `🌡️ ${data.main.temp}°C`;

            saveBtn.disabled = false; // enable save button
        })
        .catch(error => {
            console.error(error);
            alert("Error fetching data. Check your connection or API key.");
        });
    cityInput.value = '';
});

// ========== SAVE TO FAVORITES (CREATE) ==========
saveBtn.addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const city = cityName.textContent;

    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
        alert(`${city} added to favorites!`);
    } else {
        alert("City already in favorites!");
    }
});

// ========== READ FAVORITES ==========
function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesList.innerHTML = "";

    favorites.forEach(city => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
      <span>${city}</span>
      <div>
        <button class="btn btn-sm btn-primary me-2" onclick="getWeather('${city}')">View</button>
        <button class="btn btn-sm btn-danger" onclick="deleteFavorite('${city}')">Delete</button>
      </div>
    `;
        favoritesList.appendChild(li);
    });
}

// ========== UPDATE / READ FAVORITE WEATHER ==========
function getWeather(city) {
    fetch(`${API_URL}${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod && data.cod !== 200) return alert("City not found!");

            resultCard.classList.remove("d-none");
            cityName.textContent = `${data.name}`;
            temp.textContent = `🌡️ ${data.main.temp}°C`;
            saveBtn.disabled = false;
        })
        .catch(() => alert("Failed to load weather data."));
}

// ========== DELETE FAVORITE ==========
function deleteFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item !== city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}
// ========== INITIAL LOAD ==========
document.addEventListener("DOMContentLoaded", renderFavorites);