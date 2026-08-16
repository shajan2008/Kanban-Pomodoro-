const time = document.querySelector(`time`);
const timeControlOne = document.getElementById(`start-btn`);
const timeControlTwo = document.getElementById(`pause-btn`);
const timeControlThree = document.getElementById(`reset-btn`);
const modeBarOne = document.getElementById(`mode-bar-one`);
const modeBarTwo = document.getElementById(`mode-bar-two`);
const modeBarThree = document.getElementById(`mode-bar-three`);
const kanbanForm = document.getElementById(`kanban-form`);
const Task = document.getElementById(`task-input`);
const columnOne = document.getElementById(`todo-col`);
const columnTwo = document.getElementById(`in-progress-col`);
const columnThree = document.getElementById(`done-col`);
let timeLeft = 1500;
let timerId = null;
let tasks = JSON.parse(localStorage.getItem(`kanbanTasks`)) || [];
const updateDisplay = () =>{
    let minutes = Math.floor(timeLeft/60);
    let seconds = timeLeft % 60;
    let fMinutes = minutes.toString().padStart(2, '0');
    let fSeconds = seconds.toString().padStart(2, '0');
    time.textContent = `${fMinutes}:${fSeconds}`;
};
const startTimer = () =>{
    if(timerId !== null) return;
    timerId = setInterval(function() {
        timeLeft--;
        updateDisplay();
        if(timeLeft === 0){
            clearInterval(timerId);
            timerId = null;
            alert(`Your Time is Over!!!`);
        }
    }, 1000) 
};
const pauseTimer = () =>{
    clearInterval(timerId);
    timerId = null;
};
const resetTimer = () => {
    pauseTimer();
    timeLeft = 1500;
    updateDisplay();
};
const switchMode = (seconds) => {
    pauseTimer();
    timeLeft = seconds;
    updateDisplay();
};
timeControlOne.addEventListener(`click`, startTimer);
timeControlTwo.addEventListener(`click`, pauseTimer);
timeControlThree.addEventListener(`click`, resetTimer);
modeBarOne.addEventListener(`click`, () => switchMode(1500))
modeBarTwo.addEventListener(`click`, () => switchMode(300));
modeBarThree.addEventListener(`click`, () => switchMode(900));
updateDisplay();

kanbanForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    if(Task.value.trim() === ``){
        return;
    }
    const taskObject = {
        id : crypto.randomUUID(),
        title : Task.value.trim(),
        status : `todo`
    };
    tasks.push(taskObject);
    localStorage.setItem(`kanbanTasks`, JSON.stringify(tasks));
    Task.value = ``;
    renderTask();
})

const renderTask = () =>{
    columnOne.innerHTML = ``;
    columnTwo.innerHTML = ``;
    columnThree.innerHTML = ``;
    tasks.forEach(task =>{
        if(task.status === `todo`){
            let cardHTML = `
            <ul class="card">
                <li>${task.title}</li>
                <li>
                    <button onclick="moveTask('${task.id}', 'in-progress')" class="card-btn">Move Task</button>
                </li>
                <li>
                    <button onclick="deleteTask('${task.id}')" class="card-btn">Delete Task</button>
                </li>
            </ul>`;
            columnOne.innerHTML += cardHTML;
        }
        else if(task.status === `in-progress`){
            cardHTML = `
            <ul class="card">
                <li>${task.title}</li>
                <li>
                    <button onclick="moveTask('${task.id}', 'done')" class="card-btn">Move Task</button>
                </li>
                <li>
                    <button onclick="deleteTask('${task.id}')" class="card-btn">Delete Task</button>
                </li>
            </ul>`;
            columnTwo.innerHTML += cardHTML;   
        }
        else if(task.status === `done`){
            cardHTML = `
            <ul class="card">
                <li>${task.title}</li>
                <li>
                    <button onclick="deleteTask('${task.id}')" class="card-btn">Delete Task</button>
                </li>
            </ul>`;
            columnThree.innerHTML += cardHTML;
        }
    })
};
const moveTask = (taskId, newStatus) => {
    const targetTask = tasks.find(item => item.id === taskId);
    if(targetTask){
        targetTask.status = newStatus;
        localStorage.setItem(`kanbanTasks`,JSON.stringify(tasks));
        renderTask();
    }
};
const deleteTask = (taskId) =>{
    tasks = tasks.filter(dTask => dTask.id !== taskId);
    localStorage.setItem(`kanbanTasks`,JSON.stringify(tasks));
    renderTask();
};
renderTask();