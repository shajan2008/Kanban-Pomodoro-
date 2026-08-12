const time = document.getElementsByTagName(`time`);
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
let tasks = localStorage.getItem(`kanbanTasks`) || [];
function updateDisplay(){
    
};
