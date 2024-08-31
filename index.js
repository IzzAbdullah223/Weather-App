const APIKEY = "3XFKEXCBX9MZZJ9CB3W2QWZXH"
const InputField = document.querySelector("Input")
const placeName = document.querySelector(".LocationName")
const SearchBTN = document.querySelector("Button")
const MiddleContainer = document.querySelector(".Middle")
const BottomContainer = document.querySelector(".BottomContainer")
const LoadingContainer = document.querySelector(".LoadingDataContainer")
const CopyRightContainer = document.querySelector(".CopyRightContainer")
const ErrorContainer = document.querySelector(".ErrorContainer")
const Celsius = document.querySelector(".celsius")
const Farenhit = document.querySelector(".farenhit")
const LightMode = document.querySelector(".LightMode")
 

Celsius.addEventListener("click",()=>{
     if(Farenhit.classList.contains("selected")){
        Farenhit.classList.remove("selected")
        Farenhit.classList.add("notselected")
        Celsius.classList.add("selected")
        Celsius.classList.remove("notselected")
     }
})

Farenhit.addEventListener("click",()=>{
    Farenhit.classList.add("selected")
    Farenhit.classList.remove("notselected")
    Celsius.classList.remove("selected")
    Celsius.classList.add("notselected")
})
SearchBTN.addEventListener("click", async ()=>{
    ErrorContainer.style.display="none"
    const Data = await  getWeatherData(InputField.value)
    if(Data!=undefined){
    WeatherInfoLeft(Data)
    weatherInfoRight(Data);
    HourlyWeather(Data)
    }
    else{
        CopyRightContainer.style.marginTop="20px"
        LoadingContainer.style.display="none"
        MiddleContainer.style.display="none"
        BottomContainer.style.display="none"
        CopyRightContainer.style.display=""
        ErrorContainer.style.display=""
    }
})

async function getWeatherData(City){
    MiddleContainer.style.display="none";
    BottomContainer.style.display="none";
    CopyRightContainer.style.display="none";
    LoadingContainer.style.display=""
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${City}?key=${APIKEY}`)
    if(response.ok){
        return response.json()
    }
}

function WeatherInfoLeft(Data){
    setTimeout(() => {
        CopyRightContainer.style.marginTop="40px"
        MiddleContainer.style.display="";
        BottomContainer.style.display="";
        CopyRightContainer.style.display="";
        LoadingContainer.style.display="none"
        ErrorContainer.style.display="none"
    }, 2000);
    document.querySelector(".LocationName").textContent=Data.resolvedAddress
    document.querySelector(".WeatherStatus").textContent=Data.currentConditions.conditions
    document.querySelector(".TempNumber").textContent=`${((Data.currentConditions.temp-32)/1.8).toFixed(0)}°C`
    document.querySelector(".HumidityNumber").textContent=`${Data.currentConditions.humidity.toFixed(0)}%`
    document.querySelector(".WindSpeedNumber").textContent=`${Data.currentConditions.windspeed}kph`
    document.querySelector(".HeatIndexNumber").textContent=`${Data.currentConditions.uvindex}°C`
    document.querySelector(".leftImage").src=WeatherIcon(Data.currentConditions.conditions)
}

function weatherInfoRight(Data){
    const date = new Date(Data.days[1].datetime)
   document.querySelector(".firstBoxTitle").textContent=`${date.toDateString()}`
   document.querySelector(".firstBoxWeather").textContent=Data.days[1].conditions
   document.querySelector(".firstBoxImage").src = WeatherIcon(Data.days[1].conditions)
   document.querySelector(".firstBoxTemp").textContent=`${((Data.days[1].temp-32)/1.8).toFixed(0)}°C`
   document.querySelector(".RainNumberBox1").textContent=`Chances of rain: ${Data.days[1].precip}%`
   const date2 = new Date(Data.days[2].datetime)
   document.querySelector(".secondBoxTitle").textContent=`${date2.toDateString()}`
   document.querySelector(".secondBoxWeather").textContent=Data.days[2].conditions
   document.querySelector(".secondBoxImage").src = WeatherIcon(Data.days[2].conditions)
   document.querySelector(".secondBoxTemp").textContent=`${((Data.days[2].temp-32)/1.8).toFixed(0)}°C`
   document.querySelector(".RainNumberBox2").textContent=`Chances of rain: ${Data.days[2].precip}%`
}

function HourlyWeather(Data){
    const date = new Date()
    let tempHour = date.getHours()
    let tempHour2=0
    for(let i=1;i<=6;i++){
        const Meridiem = date.getHours()+i>=12? "PM" : "AM";
        let Hour = (date.getHours()+i)%12||12
        let WeeklyHour=(tempHour+i)%12||12
        if(tempHour+i>=24){
            document.querySelector(`.smallBoxHour${i}`).textContent=`${Hour} ${"AM"}`
            document.querySelector(`.smallBoxTemp${i}`).textContent=`${((Data.days[0].hours[tempHour2].temp-32)/1.8).toFixed(2)}°C`
            document.querySelector(`.smallBoxImage${i}`).src=WeatherIcon(Data.days[0].hours[tempHour2].conditions,WeeklyHour)
            tempHour2+=1
        }
        else{
        document.querySelector(`.smallBoxHour${i}`).textContent=`${Hour} ${Meridiem}`
        document.querySelector(`.smallBoxTemp${i}`).textContent=`${((Data.days[0].hours[tempHour+i].temp-32)/1.8).toFixed(2)}°C`
        document.querySelector(`.smallBoxImage${i}`).src=WeatherIcon(Data.days[0].hours[tempHour+i].conditions,WeeklyHour)
        }
    }
}

function WeatherIcon(Conditions,WeeklyHour){
    const date = new Date()
    const Meridiem = date.getHours()>=12? "PM" : "AM";
    console.log(Meridiem)
    let Hour = (date.getHours())%12||12
    console.log(Hour)
    if(Meridiem==="PM"){
        switch(true){
            case Conditions==="Clear":
                if(Hour ==6||Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 ||Hour==12
                 || WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                    return "./crescent-moon.png"
                else
                    return "./sun.png"

            case Conditions==="Partially cloudy":
                if(Hour ==6||Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 ||Hour==12 ||
                 WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12) 
                        return "./cloudy-night.png"
                    else
                        return "./PartiallyCloudy.png"

            case Conditions==="Overcast":
                if(Hour ==6|| Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 ||Hour==12 ||
                  WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                    return "./OvercastNight.png"
                else
                    return "./overcast.png"

            case Conditions==="Rain":
                return "./rain.png"

            case Conditions==="Rain, Partially cloudy":
                if(Hour ==6|| Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 ||Hour==12 || 
                WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                    return "./PartialRainNight.png"
                else
                    return "./PartialRain.png"
            }  
    }
    else{
       
        switch(true){
            case Conditions==="Clear":
                if(Hour ==6|| Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 || Hour==12 ||
                 WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                    return "./sun.png"
                else
                    return  "./crescent-moon.png"
                

            case Conditions==="Partially cloudy":
                if(Hour ==6|| Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 ||Hour==12  ||
                 WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                        return "./PartiallyCloudy.png"
                    else
                        return "./cloudy-night.png"

            case Conditions==="Overcast":
                if(Hour ==6|| Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 ||  Hour==12 ||
                  WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                    return "./overcast.png"
                else
                    return "./OvercastNight.png"

            case Conditions==="Rain":
                return "./rain.png"

            case Conditions==="Rain, Partially cloudy":
                if(Hour ==6|| Hour==7 || Hour==8 || Hour==9 || Hour==10 || Hour==11 || Hour==12 ||
                 WeeklyHour==7 || WeeklyHour==8 || WeeklyHour==9 || WeeklyHour==10 || WeeklyHour==11 || WeeklyHour==12)
                    return "./PartialRain.png"
                else
                    return "./PartialRainNight.png"
            }  
    }
}