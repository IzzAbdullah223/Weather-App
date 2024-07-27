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
   document.querySelector(".firstBoxWeather").textContent=Data.days[1].conditions
   document.querySelector(".firstBoxImage").src = firstBoxImage(Data)
   const farenhit=Data.days[1].temp
   console.log(farenhit)
   document.querySelector(".firstBoxTemp").textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
   document.querySelector(".RainNumberBox1").textContent=Data.days[1].precip+"%"

}

function weatherInfoRightSecondBox(Data){
    console.log(Data)
   document.querySelector(".secondBoxWeather").textContent=Data.days[1].conditions
   document.querySelector(".secondBoxImage").src = firstBoxImage(Data)
   const farenhit=Data.days[1].temp
   console.log(farenhit)
   document.querySelector(".secondBoxTemp").textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
   document.querySelector(".RainNumberBox2").textContent=Data.days[1].precip+"%"

}
function weatherImage(Data){
   switch(true) {
        case Data.currentConditions.conditions==="Clear":
            return "./sun.png";

        case Data.currentConditions.conditions==="Partially cloudy":
            return "./PartiallyCloudy.png";
   }

}

function firstBoxImage(Data){
    switch(true) {
        case Data.days[1].conditions==="Clear":
            return "./sun.png";

        case Data.days[1].conditions==="Partially cloudy":
            return "./PartiallyCloudy.png";
   }


}
 