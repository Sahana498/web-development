// script.js

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];
let lastRecordedTime = 0;

function updateTimeDisplay() {
    const timeDisplay = document.getElementById('time-display');
    const timeInSeconds = elapsedTime;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    timeDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime * 1000;
        timer = setInterval(() => {
            elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            updateTimeDisplay();
        }, 1000);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lastRecordedTime = 0;
    updateTimeDisplay();
    document.getElementById('lap-times').innerHTML = '';
    laps = [];
}

function recordLap() {
    if (isRunning) {
        const lapTime = Math.floor((Date.now() - startTime) / 1000) - lastRecordedTime;
        lastRecordedTime = Math.floor((Date.now() - startTime) / 1000);
        const formattedLapTime = formatTime(lapTime);
        laps.push(formattedLapTime);
        displayLaps();
    }
}

function displayLaps() {
    const lapTimesList = document.getElementById('lap-times');
    lapTimesList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapTimesList.appendChild(li);
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
