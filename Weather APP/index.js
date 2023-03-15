const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector("[.weather-container]")

const grantAccessContainer = document.querySelector(".grand-loction-container");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

function switchTab(clickTab) {
    if(clickTab != currentTab)  {
        currentTab.classList.remove("current-tab");
        currentTab = clickTab;
        currentTab.classList.add("current-tab");

        if(!searchFrom.classList.contains("active")) {
            userContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");

            searchFrom.classList.add("active");
        }

        else{
            searchFrom.classList.remove("active");
            userInfoContainer.classList.remove("active");
    
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=>{
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

function getfromSessionStorage() {
    const localCondinates = sessionStorage.getItem("user-cordinates");

    if(!localCondinates) {
        grantAccessContainer.classList.add("active");
    }

    else{
        const coordinates = JSON.parse(localCondinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat,lon} = coordinates;
    //make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visiable
    loadingScreen.classList.add("active");

    //api call
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );

        const data = await response.json();  

        loadingScreen.classList.remove("active");
        grantAccessContainer.classList.add("active");
    }

    catch(err) {
        loadingScreen.classList.remove("active");
        //home work
    }
} 

function renderWeatherInfo(weather) {
    //firstly we need to fatch element

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

}

