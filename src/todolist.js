
let userToDoList = []
let toDoListLocalStorage = JSON.parse(localStorage.getItem("toDo"));

if(localStorage.getItem("toDo") !== null){
    window.addEventListener("load", (event) => {
        userToDoList = toDoListLocalStorage
        addListAtUserScreen();
      });
}


function getToDoList(){
    addAndClearInput();
    addToDoListAtLocalStorage(userToDoList);
    addListAtUserScreen()
    }



function addToDoListAtLocalStorage(toDoList){
    if(localStorage.getItem('toDo') === null){
        localStorage.setItem("toDo", JSON.stringify(toDoList));
    }
    localStorage.setItem("toDo",JSON.stringify(userToDoList));
}


function addListAtUserScreen(){
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
    console.log(index)
    console.log(userToDoList)
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

