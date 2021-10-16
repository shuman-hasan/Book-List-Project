let form = document.querySelector('#taskForm');
let inputTest = document.querySelector('#taskInput');
let filter = document.querySelector('#filterTask');
let taskList = document.querySelector('ol');
let clearTask = document.querySelector('#clearBtn');


// add Evenlistener
form.addEventListener('submit', myfun);
taskList.addEventListener('click', removeTask);
clearTask.addEventListener('click', cleartask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

// define function
function myfun(e){
    if(inputTest.value === ''){
        alert('please input something');
    }else{
        // create li
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(inputTest.value + ' '))
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.style.color = 'red';
        link.style.fontSize = '30px';
        link.style.textDecoration = 'none';
        link.innerHTML = 'x';
        li.appendChild(link);


         // local storage
        storeTaskInLocalStorage(inputTest.value);
        inputTest.value = '';
   
    }
    e.preventDefault();
}





// clearTask function
function cleartask (e){
    taskList.innerHTML = '';
    localStorage.clear();
}


// remove task
function removeTask (e){
    if(e.target.hasAttribute('href')){
      if(confirm("Are you sure?")){
          let ele = e.target.parentElement;
          ele.remove();
          removeFromLs(ele);
      }    
    }
}




// filter Task
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none';
        }
    })       
}




// storeInLocalStorage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '))
        taskList.appendChild(li);
        let link = document.createElement('a');            
        link.setAttribute('href', '#')
        link.style.color = 'red';
        link.style.fontSize = '30px';
        link.style.textDecoration = 'none';
        link.innerHTML = 'x';
        li.appendChild(link);
    })
}

// local storage remove
function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index)=>{
        if(li.textContent.trim() === task){
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}