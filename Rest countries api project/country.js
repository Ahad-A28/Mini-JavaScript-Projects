const countryName = new URLSearchParams(window.location.search).get("name");
const Nativename = document.querySelector(".nativeName");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subregion = document.querySelector(".subregion");
const Capital = document.querySelector(".Capital");
const continents = document.querySelector(".continents");
const flagimg = document.querySelector(".flagimg");
const name = document.querySelector(".name")
const borders = document.querySelector(".border");
const ToplevelDomain = document.querySelector(".ToplevelDomain")
const Currencies  = document.querySelector(".Currencies")
const Languages  = document.querySelector(".Languages")
const Darkmode = document.querySelector("#Dark-mode");
const lightmode = document.querySelector("#light-mode");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data[0]);
    name.textContent = data[0].name.common;
    Nativename.textContent = Object.values(data[0].name.nativeName)[0].common;
    population.textContent = data[0].population.toLocaleString("en-IN");
    region.textContent = data[0].region;
    ToplevelDomain.textContent = Object.values(data[0].currencies)[0].symbol;
    Currencies.textContent = Object.values(data[0].currencies)[0].name ;
    Languages.textContent = Object.values(data[0].languages) ;
    if (data[0].subregion) {
      subregion.textContent = data[0].subregion;
    } else {
      subregion.textContent = "Not Available";
    }
    Capital.textContent = data[0].capital;
    continents.textContent = data[0].continents;
    flagimg.src = data[0].flags.svg;
    
    if (data[0].borders) {
      data[0].borders.forEach((element) => {
        fetch(`https://restcountries.com/v3.1/alpha/${element}`)
          .then((response) => response.json())
          .then((data) => {
            
            let a = document.createElement("a");
            a.href = `country.html?name=${data[0].name.common}`;
            a.innerText = data[0].name.common;
            borders.appendChild(a);
          });
      });
    } else {
      borders.textContent = " Borders : Not Available";
    }
  })
  .catch((error) => {
    console.log(error);
    alert("Country not found");
    // goback();
  });

function goback() {
  window.history.back();
}

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