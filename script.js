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