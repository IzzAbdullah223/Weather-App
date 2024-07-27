const APIKEY = "3XFKEXCBX9MZZJ9CB3W2QWZXH"

const InputField = document.querySelector("Input")

const placeName = document.querySelector(".LocationName")

const weatherStatus = document.querySelector(".WeatherStatus")

const temp = document.querySelector(".TempNumber")

const Humidity = document.querySelector(".HumidityNumber")

const WindSpeed = document.querySelector(".WindSpeedNumber")

const HeatIndex = document.querySelector(".HeatIndexNumber")

 


 

 

 
 
 

const SearchBTN = document.querySelector("Button")

 SearchBTN.addEventListener("click", async ()=>{
    
    const Data = await  getWeatherData(InputField.value)

     WeatherInfoLeft(Data)

    weatherInfoRightFirstBox(Data);

    weatherInfoRightSecondBox(Data);
})

async function getWeatherData(City){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${City}?key=${APIKEY}`)
    
   
    

    if(response.ok){
        return response.json()
    }
}


function WeatherInfoLeft(Data){
    console.log(Data)
  
  placeName.textContent=Data.resolvedAddress
  weatherStatus.textContent=Data.currentConditions.conditions
  const farenhit = Data.currentConditions.temp
  temp.textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
  Humidity.textContent=Math.trunc(Data.currentConditions.humidity)+"%"
  WindSpeed.textContent=Data.currentConditions.windspeed+"kph"
  HeatIndex.textContent=Data.currentConditions.uvindex+"°C"

  document.querySelector(".leftImage").src=weatherImage(Data)

}

function weatherInfoRightFirstBox(Data){
    const date = new Date(Data.days[1].datetime)
    let Time =getDateForBoxes(date)
   document.querySelector(".firstBoxTitle").textContent=`${Time} ${date.getDate()}`
   document.querySelector(".firstBoxWeather").textContent=Data.days[1].conditions
   document.querySelector(".firstBoxImage").src = firstBoxImage(Data)
   const farenhit=Data.days[1].temp
   document.querySelector(".firstBoxTemp").textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
   document.querySelector(".RainNumberBox1").textContent=`Chances of rain: ${Data.days[1].precip}%`

}

function weatherInfoRightSecondBox(Data){
    const date = new Date(Data.days[2].datetime)
    let Time =getDateForBoxes(date)
   document.querySelector(".secondBoxTitle").textContent=`${Time} ${date.getDate()}`
   document.querySelector(".secondBoxWeather").textContent=Data.days[2].conditions
   document.querySelector(".secondBoxImage").src = secondBoxImage(Data)
   const farenhit=Data.days[2].temp
   document.querySelector(".secondBoxTemp").textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
   document.querySelector(".RainNumberBox2").textContent=`Chances of rain: ${Data.days[2].precip}%`

}


function weatherImage(Data){
   switch(true) {
        case Data.currentConditions.conditions==="Clear":
            return "./sun.png";

        case Data.currentConditions.conditions==="Partially cloudy":
            return "./PartiallyCloudy.png";

        case Data.currentConditions.conditions==="Overcast":
            return "./overcast.png";

        case Data.currentConditions.conditions==="Rain, Partially cloudy":
            return "./PartialRain.png"

        case Data.currentConditions.conditions==="Rain, Overcast":
            return "./OvercastRain.png"
   }

}

function firstBoxImage(Data){
    switch(true) {
        case Data.days[1].conditions==="Clear":
            return "./sun.png";

        case Data.days[1].conditions==="Partially cloudy":
            return "./PartiallyCloudy.png";

        case Data.days[1].conditions==="Overcast":
            return "./overcast.png";

        case Data.days[1].conditions==="Rain, Partially cloudy":
            return "./PartialRain.png";

        case Data.currentConditions[1]==="Rain, Overcast":
            return "./OvercastRain.png"
   }


}

function secondBoxImage(Data){
    switch(true) {
        case Data.days[2].conditions==="Clear":
            return "./sun.png";

        case Data.days[2].conditions==="Partially cloudy":
            return "./PartiallyCloudy.png";

        case Data.days[2].conditions==="Overcast":
            return "./overcast.png";

        case Data.days[2].conditions==="Rain, Partially cloudy":
            return "./PartialRain.png";

        case Data.days[2].conditions==="Rain, Overcast":
            return "./OvercastRain.png"
   }
}

function getDateForBoxes(date){
    let Day;
    let Month;
    
    switch(true){
        
        case date.getDay()===0:
            Day="Sunday";
            break;

        case date.getDay()===1:
            Day="Monday"
            break;

        case date.getDay()===2:
            Day="Tuesday"
            break;

        case date.getDay()===3:
            Day="Wenseday"
            break;

        case date.getDay()===4:
            Day="Thursday"
            break;

        case date.getDay()===5:
            Day="Friday"
            break;

        case date.getDay()===6:
            Day="Saturday";
            break;     
    }

    switch(true){
        case date.getMonth()===0:
            Month="January";
            break;

        case date.getMonth()===1:
            Month="Feburary"
            break;

        case date.getMonth()===2:
            Month="March"
            break;

        case date.getMonth()===3:
            Month="April"
            break;

        case date.getMonth()===4:
            Month="May"
            break;

        case date.getMonth()===5:
            Month="June"
            break;

        case date.getMonth()===6:
            Month="July";
            break;     
    }

    return `${Day}, ${Month}`

}
 
 