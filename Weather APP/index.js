console.log("hello world");

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

function renderWeatherInfo() {
        let newPara = document.createElement('p');
        newPara.textContent = `${data?.main?.temp.toFixed(2)} *C`

        document.body.appendChild(newPara); 
        }


async function fetchWeatherDetails() {
        
        try{
            let city = "surat";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();8
    
        console.log("Weather data:-> " , data);

        renderWeatherInfo(data);
        }
        
        catch(error) {
        //hendele data   
        }
    
}

async function getCurstomWetherdata() {
    try{
        let latitude = 17;
        let longitude = 18;

        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?
        lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

        let data = result.json();

        console.log(data);

        renderWeatherInfo(data);
    }

    catch(error){
        console.log("error is comeing" , error);
    }

}