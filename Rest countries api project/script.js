const filterByRegion = document.querySelector(".filterByRegion");
const cardContainer = document.querySelector('.card-container-main');
const searchInput = document.querySelector(".inputfield")
const loading = document.querySelector("#loading");
const Darkmode = document.querySelector("#Dark-mode");
const lightmode = document.querySelector("#light-mode");
let allCountriesData;

// Reander Countries
function renderCountries(data) {
    cardContainer .innerHTML = ''
    data.forEach((country) => {
   const div = document.createElement('div');
    div.classList.add('card-container');
    cardContainer.appendChild(div)
    div.innerHTML= `<a href="/country.html?name=${country.name.common}" class="card ">
                  <img src="${country.flags.svg}"   alt="">
                  <div class="text ">
                      <h3>${country.name.common}</h3>
          <p>Population : ${country.population.toLocaleString('en-IN')}</p>
          <p>Region :  ${country.region} </p>
          <p>Capital : ${country.capital} </p>`
    })
  }


fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })




//  Search
  searchInput.addEventListener('input',  (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
  })
  // filter
 filterByRegion.addEventListener("change", () => {
    const selectedRegion = filterByRegion.value;
    searchInput.value = ""
    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then(response => response.json()) // Return the result of response.json()
        .then(data => {
        
            cardContainer.innerHTML = data.map(country => `
                <div class="card-container">
                    <a href="/country.html?name=${country.name.common}" class="card">
                        <img src="${country.flags.svg}" alt="">
                        <div class="text text-white">
                            <h3>${country.name.common}</h3>
                            <p>Population: ${country.population.toLocaleString('en-IN')}</p>
                            <p>Region: ${country.region}</p>
                            <p>Capital: ${country.capital || 'N/A'}</p> <!-- Handle undefined capital -->
                        </div>
                    </a>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching countries by region:', error);
        });
});

// Darkmode and Lightmode

// Initialize theme from localStorage
const theme = localStorage.getItem('theme');

// Apply the theme on page load
if (theme === 'dark') {
  document.body.classList.add('dark');
  lightmode.style.display = "flex";
  Darkmode.style.display = "none";
} else {
  document.body.classList.remove('dark');
  lightmode.style.display = "none";
  Darkmode.style.display = "flex";
}

// Add event listener for dark mode button
Darkmode.addEventListener('click', () => {
  // Set theme in localStorage
  localStorage.setItem('theme', 'dark');
  
  // Apply the dark theme
  document.body.classList.add('dark');
  
  // Toggle display of buttons
  lightmode.style.display = "flex";
  Darkmode.style.display = "none";
});

// Add event listener for light mode button
lightmode.addEventListener('click', () => {
  // Remove the dark theme class
  document.body.classList.remove('dark');
  
  // Toggle display of buttons
  lightmode.style.display = "none";
  Darkmode.style.display = "flex";
  
  // Remove theme from localStorage
  localStorage.removeItem('theme');
});