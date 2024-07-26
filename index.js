const APIKEY = "905910e225df16f13cfd483a25c79aa7"

const InputField = document.querySelector("Input")

const placeName = document.querySelector(".LocationName")

const Humidity = document.querySelector(".HumidityNumber")

const Wind = document.querySelector(".WindSpeedNumber")

const Heat = document.querySelector(".HeatIndexNumber")

 
 
 

const SearchBTN = document.querySelector("Button")

 SearchBTN.addEventListener("click", async ()=>{
    
    const Data = await  getWeatherData(InputField.value)

     WeatherInfo(Data)
})

async function getWeatherData(City){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${APIKEY}`)

    if(response.ok){
        return response.json()
    }
}


function WeatherInfo(Data){
    console.log(Data)
    placeName.textContent=`${Data.name}`
    Humidity.textContent=`${Data.main.humidity}%`
    Wind.textContent=`${Data.weather.deg}`
     

    

}


 