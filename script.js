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


function getToDoList(){
    addAndClearInput();
    addToDoListAtLocalStorage(userToDoList);
    addListAtUserScreen()
    }


function addToDoListAtLocalStorage(toDoList){
    if(localStorage.getItem('toDo') === null){
        localStorage.setItem("toDo", toDoList);
    }
    localStorage.setItem("toDo",JSON.stringify(toDoList));
}


function addListAtUserScreen(){
    let toDoListLocalStorage = JSON.parse(localStorage.getItem("toDo"));
    const tabela = document.getElementById('tabela');
    const tbody = tabela.querySelector('tbody');
    tbody.innerHTML = '';


   toDoListLocalStorage.forEach((item,index) =>{
    const tr = document.createElement('tr');
    const task = document.createElement('td');
    const deleteButton = document.createElement('td');
    const button = document.createElement('button')
    button.setAttribute('type','button')
    button.classList.add( 'btn-close', "btn-close-white");
    deleteButton.appendChild(button)
    task.textContent = item.task
    tr.appendChild(task)
    tr.appendChild(deleteButton)
    tbody.appendChild(tr);


    deleteButton.addEventListener('click',()=>{
        removeTaskFromList(index)
    })
   })
}

function removeTaskFromList(index){
    userToDoList.splice(index,1);
    addToDoListAtLocalStorage(userToDoList);
    addListAtUserScreen();
}


function addAndClearInput(){
    let input = document.getElementById('toDo');
    let inputValue = input.value;
    if(inputValue != ""){
        userToDoList.push({
            task:inputValue
        });
    }
        input.value = "";
}