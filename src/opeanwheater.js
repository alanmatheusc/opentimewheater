(function getUserLocation(){
    navigator.geolocation.getCurrentPosition(position =>{
       getTimeWheaterByLocation(position.coords);
   })
})();

let userTimeWheaterData;

let userToDoList = []

async function getTimeWheaterByLocation(userPosition){
try{
   const {latitude,longitude} = userPosition;
   await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=72857d324dc5a0d7891a61a5f0bffc48`)
   .then(resp => resp.json())
   .then(data =>{
       userTimeWheaterData = data;
       addWeatherDataToUserScreen(userTimeWheaterData);
   })
}catch(error){
   console.log("User denied Location permissions");
}
}

function addWeatherDataToUserScreen(wheaterData){
   if(wheaterData === null){
       return;
   }
}

function convertKelvinToCelsius(kelvin){
   return kelvin - 273,15;
}