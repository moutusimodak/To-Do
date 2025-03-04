const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
loadTask();

//Add task
function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task);
        taskInput.value = "";
        saveTasks()
    } else {
        alert("please enter a task");
    }
}

addButton.addEventListener('click', addTask)

// Create  new task element and append
function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        saveTasks();
    })
}

//Save in local storage
function saveTasks() {
    let tasks = []
    taskList.querySelectorAll("li").forEach(function (item) {
        tasks.push(item.textContent.replace('Delete', '').trim())
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(createTaskElement)
}