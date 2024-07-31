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

    HourlyForeCast(Data)
})

async function getWeatherData(City){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${City}?key=${APIKEY}`)
    
   
    

    if(response.ok){
        return response.json()
    }
}


function WeatherInfoLeft(Data){
    const date = new Date()

     
   
  
  placeName.textContent=Data.resolvedAddress
  weatherStatus.textContent=Data.currentConditions.conditions
  const farenhit = Data.currentConditions.temp
  temp.textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
  Humidity.textContent=Math.trunc(Data.currentConditions.humidity)+"%"
  WindSpeed.textContent=Data.currentConditions.windspeed+"kph"
  HeatIndex.textContent=Data.currentConditions.uvindex+"°C"

  document.querySelector(".leftImage").src=weatherImage(Data,date)

}

function weatherInfoRightFirstBox(Data){
    const date = new Date(Data.days[1].datetime)
    let Time =getDateForBoxes(date)
   document.querySelector(".firstBoxTitle").textContent=`${Time} ${date.getDate()}`
   document.querySelector(".firstBoxWeather").textContent=Data.days[1].conditions
   document.querySelector(".firstBoxImage").src = firstBoxImage(Data,date)
   const farenhit=Data.days[1].temp
   document.querySelector(".firstBoxTemp").textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
   document.querySelector(".RainNumberBox1").textContent=`Chances of rain: ${Data.days[1].precip}%`

}

function weatherInfoRightSecondBox(Data){
    const date = new Date(Data.days[2].datetime)
   
  
    let Time =getDateForBoxes(date)
   document.querySelector(".secondBoxTitle").textContent=`${Time} ${date.getDate()}`
   document.querySelector(".secondBoxWeather").textContent=Data.days[2].conditions
   document.querySelector(".secondBoxImage").src = secondBoxImage(Data,date)
   const farenhit=Data.days[2].temp
   document.querySelector(".secondBoxTemp").textContent=`${((farenhit-32)*5/9).toFixed(1)}°C`
   document.querySelector(".RainNumberBox2").textContent=`Chances of rain: ${Data.days[2].precip}%`

}


function weatherImage(Data,date){
   const Meridiem = date.getHours()>=12? "PM" : "AM";
    
    console.log(Data)
   switch(true) {

        case Data.currentConditions.conditions==="clear":
            if(Data.currentConditions.icon==="clear-day"){
                "./sun.png";
               }
               else{
                   return "./crescent-moon.png"
               }

                 
                
            
        case Data.currentConditions.conditions==="Partially cloudy":
            if(Data.currentConditions.icon==="partly-cloudy-day"){
            return "./PartiallyCloudy.png";
            }
            else{
                return "./cloudy-night.png"
            }

        case Data.currentConditions.conditions==="Overcast":
            if(Meridiem==="PM"){
        
            return "./overcast.png";
            }
            else{
                return "./OvercastNight.png"
            }

        case Data.currentConditions.conditions==="Rain, Partially cloudy":
           
            return "./PartialRain.png"
            
         

        case Data.currentConditions.conditions==="Rain, Overcast":
            return "./OvercastRain.png"
   }

}

function firstBoxImage(Data,date){
     
    const Meridiem = date.getHours()>=12? "PM" : "AM";
 

    switch(true) {

        case Data.days[1].conditions==="Clear":

            if(Meridiem==="PM"){
                "./sun.png";
               }
               else{
                   return "./crescent-moon.png"
               }

        case Data.days[1].conditions==="Partially cloudy":

            if(Meridiem==="PM"){
                return "./PartiallyCloudy.png";
                }
                else{
                    return "./cloudy-night.png"
                }
        
        case Data.days[1].conditions==="Overcast":

            if(Meridiem==="PM"){
        
                return "./overcast.png";
                }
                else{
                    return "./OvercastNight.png"
                }

        case Data.days[1].conditions==="Rain, Partially cloudy":
            return "./PartialRain.png";

        case Data.currentConditions[1]==="Rain, Overcast":
            return "./OvercastRain.png"
   }


}

function secondBoxImage(Data,date){
          
    const Meridiem = date.getHours()>=12? "PM" : "AM";
 

    switch(true) {

        case Data.days[2].conditions==="Clear":

            if(Meridiem==="PM"){
                "./sun.png";
               }
               else{
                   return "./crescent-moon.png"
               }

        case Data.days[2].conditions==="Partially cloudy":

            if(Meridiem==="PM"){
                return "./PartiallyCloudy.png";
                }
                else{
                    return "./cloudy-night.png"
                }
        
        case Data.days[2].conditions==="Overcast":

            if(Meridiem==="PM"){
        
                return "./overcast.png";
                }
                else{
                    return "./OvercastNight.png"
                }

        case Data.days[2].conditions==="Rain, Partially cloudy":
            return "./PartialRain.png";

        case Data.currentConditions[2]==="Rain, Overcast":
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

function HourlyForeCast(Data){
     
    const date = new Date();

    console.log(date)

    let HourTemp = date.getHours()



        if(HourTemp===23){
            HourTemp=0
        }

     
     for(let i=1;i<=6;i++){
      
        let smallBoxHour = (date.getHours()+i)%12||12
        let Meridiem = smallBoxHour>=12? "PM" : "AM";
        document.querySelector(`.smallBoxHour${i}`).textContent=`${smallBoxHour} ${Meridiem}`

        if(HourTemp===0){ // this is not finished btw just need to set temp in it and shit just like else
             for(let i=0;i<=5;i++){     
                console.log(Data.days[0].hours[HourTemp])
                HourTemp+=1
             }
        }

        else{
            let temp=((Data.days[0].hours[date.getHours()+i].temp-32)*5/9).toFixed(1);
            document.querySelector(`.smallBoxTemp${i}`).textContent=`${temp} °C`
        }    
     }
   
   
ImageForHourlyForecast(Data)
}


function ImageForHourlyForecast(Data){
    const date = new Date();
    console.log(Data)
 
     
        

     for(let i=1;i<=6;i++){
        const Meridiem = date.getHours()+1>=12? "PM" : "AM";
    
        switch(true){

             

            case Data.days[0].hours[date.getHours()+i].conditions==="Clear":

                if(Data.days[0].hours[date.getHours()+i].icon==="clear-day"){
                    document.querySelector(`.smallBoxImage${i}`).src="./sun.png"
                }
                else{
                    document.querySelector(`.smallBoxImage${i}`).src="./crescent-moon.png"
                }

                break;

            case Data.days[0].hours[date.getHours()+i].conditions==="Partially cloudy":

                if(Data.days[0].hours[date.getHours()+i].icon==="partly-cloudy-day"){
                    console.log("hello?")
                    document.querySelector(`.smallBoxImage${i}`).src="./PartiallyCloudy.png"
                }
                else{
                    document.querySelector(`.smallBoxImage${i}`).src="./cloudy-night.png"
                }

                break;

                case Data.days[0].hours[date.getHours()+i].conditions==="Overcast":
                    if(Meridiem==="AM" && date.getHours()+i=== 7 || 8 || 9 ||10 ||11){                       
                        document.querySelector(`.smallBoxImage${i}`).src==="./overcast.png"
                    }
                 
    
                    else if(Meridiem==="PM" && date.getHours()+i=== 7 || 8 || 9 ||10 ||11) {

                        document.querySelector(`.smallBoximage${i}`).src==="./OvercastNight.png"
                    }
    
                    else if(Meridiem ==="PM"){
                   
                        document.querySelector(`smallBoxImage${i}`).src==="./overcast.png"
                    }
    
                   else{
                         
                        document.querySelector(`smallBoxImage${i}`).src==="./OvercastNight.png";
                   }     
                   break;     
            
        }
    }
}