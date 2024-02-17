// let result = document.getElementById("result");
// let searchBtn = document.getElementById("search-btn");
// let cityRef = document.getElementById("city");

// //Function to fetch weather details from api and display them
// let getWeather = () => {
//   let cityValue = cityRef.value;
//   //If input field is empty
//   if (cityValue.length == 0) {
//     result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
//   }
//   //If input field is NOT empty
//   else {
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
//     //Clear the input field
//     cityRef.value = "";
//     fetch(url)
//       .then((resp) => resp.json())
//       //If city name is valid
//       .then((data) => {
//         console.log(data);
//         console.log(data.weather[0].icon);
//         console.log(data.weather[0].main);
//         console.log(data.weather[0].description);
//         console.log(data.name);
//         console.log(data.main.temp_min);
//         console.log(data.main.temp_max);
//         result.innerHTML = `
//         <h2>${data.name}</h2>
//         <h4 class="weather">${data.weather[0].main}</h4>
//         <h4 class="desc">${data.weather[0].description}</h4>
//         <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
//         <h1>${data.main.temp} &#176;</h1>
//         <div class="temp-container">
//             <div>
//                 <h4 class="title">min</h4>
//                 <h4 class="temp">${data.main.temp_min}&#176;</h4>
//             </div>
//             <div>
//                 <h4 class="title">max</h4>
//                 <h4 class="temp">${data.main.temp_max}&#176;</h4>
//             </div>
//         </div>
//         `;
//       })
//       //If city name is NOT valid
//       .catch(() => {
//         result.innerHTML = `<h3 class="msg">City not found</h3>`;
//       });
//   }
// };
// searchBtn.addEventListener("click", getWeather);
// window.addEventListener("load", getWeather);


let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let autocompleteItems = document.getElementById("autocomplete-items");
let timeout;

// Function to fetch city suggestions
let fetchCitySuggestions = (input) => {
  fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&cnt=10&appid=${key}`)
    .then((response) => response.json())
    .then((data) => {
      const cities = data.list.map(city => city.name);
      // Clear previous suggestions
      autocompleteItems.innerHTML = '';
      // Display suggestions
      cities.forEach(city => {
        let item = document.createElement('div');
        item.classList.add('autocomplete-item');
        item.textContent = city;
        item.addEventListener('click', () => {
          // When a suggestion is clicked, populate the input field with the selected city
          cityRef.value = city;
          autocompleteItems.innerHTML = ''; // Clear the suggestions
        });
        autocompleteItems.appendChild(item);
      });
    })
    .catch((error) => {
      console.error('Error fetching city suggestions:', error);
    });
};

// Function to handle keyup event on the input field
cityRef.addEventListener("keyup", function() {
  clearTimeout(timeout);
  let cityValue = cityRef.value.trim();
  if (cityValue.length > 0) {
    timeout = setTimeout(() => {
      // Fetch city suggestions
      fetchCitySuggestions(cityValue);
    }, 500); // Delay to wait for user to finish typing
  } else {
    autocompleteItems.innerHTML = ''; // Clear the suggestions if input is empty
  }
});

// Function to handle click event on the search button
searchBtn.addEventListener("click", function() {
  let cityValue = cityRef.value.trim();
  if (cityValue.length > 0) {
    // Perform search
    getWeather(cityValue);
  } else {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
});

// Function to get weather on window load
window.addEventListener("load", function() {
  let cityValue = cityRef.value.trim();
  if (cityValue.length > 0) {
    // Perform search
    getWeather(cityValue);
  }
});

// Function to fetch weather details from API and display them
let getWeather = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = `<h3 class="msg">City not found</h3>`;
    });
};