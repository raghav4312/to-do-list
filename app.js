//defining the ui variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".list-group");
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector("#task");
const dateInput = document.querySelector("#date-select");


// load all events listeners
loadEventListeners();


function loadEventListeners() {
    //add task event
    document.addEventListener("DOMContentLoaded",getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',delTask);
    clearBtn.addEventListener("click",clearTask)
    filter.addEventListener('keyup', filterTasks);

}


function getTasks(e)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement("li");
        //add class
        li.className = 'list-group-item';
        //create text node and append it to the list
        li.appendChild(document.createTextNode(task));

        //create new link element (X to delete the list)
        const link = document.createElement("a");
        //add class
        link.className = "delete-item";
        //add the icon
        link.innerHTML = '<button type="button" class="close" aria-label="Close" style="float:right;"><span aria-hidden="true">&times;</span></button>';
        li.appendChild(link);
        
        //append the li to the ul
        taskList.appendChild(li);
    });
}


function addTask(e)
{
    if(taskInput.value=== ""||  dateInput.value==="")
    {
        alert("Date or Task value missing   ");
    }
    else{
        //create li element
        const li = document.createElement("li");
        //add class
        li.className = 'list-group-item';
        //create text node and append it to the list
        li.appendChild(document.createTextNode(taskInput.value));
        li.appendChild(document.createTextNode(" ("+dateInput.value+")"));
        //create new link element (X to delete the list)
        const link = document.createElement("a");
        //add class
        link.className = "delete-item";
        //add the icon
        link.innerHTML = '<button type="button" class="close" aria-label="Close" style="float:right;"><span aria-hidden="true">&times;</span></button>';
        //append the icon to the list
        li.appendChild(link);
        
        //append the li to the ul
        taskList.appendChild(li);

        //store the task in local storge
        storeTask(taskInput.value+" ("+dateInput.value+")");

        //clear the input form
        taskInput.value = '';

        e.preventDefault();

    }
    
}

function delTask(e)
{

    if(e.target.parentElement.parentElement.classList.contains("delete-item")){

        if(confirm('Are You Sure?'))
        {
            e.target.parentElement.parentElement.parentElement.remove();

            removeTask(e.target.parentElement.parentElement.parentElement);
        }
    }
    
}

function clearTask(e)
{
    
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLS();

}

function clearTaskFromLS()
{
  localStorage.clear();

}

function storeTask(task)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function removeTask(taskItems)
{
    let tasks;
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
        if(taskItems.textContent === task){
            task.splice(index,1);
        }
    })

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.list-group-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }