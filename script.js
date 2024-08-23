let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let running = false;

const hoursDisplay = document.getElementById('hours');
const minsDisplay = document.getElementById('mins');
const secsDisplay = document.getElementById('secs');
const tenthDisplay = document.querySelector('.tenth');
const milisecsDisplay = document.querySelector('.milisecs');
const splitContainer = document.querySelector('.split-value');

function updateDisplay() {
  hoursDisplay.textContent = String(hours).padStart(2, '0');
  minsDisplay.textContent = String(minutes).padStart(2, '0');
  secsDisplay.textContent = String(seconds).padStart(2, '0');
  tenthDisplay.textContent = Math.floor(milliseconds / 100);
  milisecsDisplay.textContent = String(milliseconds % 100).padStart(2, '0');
}

function startStopwatch() {
  milliseconds += 10;

  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  // Update the display
  updateDisplay();
}

document.getElementById('startstopButton').addEventListener('click', function() {
  if (!running) {
    interval = setInterval(startStopwatch, 10);
    this.textContent = 'Stop';
    running = true;
  } else {
    clearInterval(interval);
    this.textContent = 'Start';
    running = false;
  }
});

document.getElementById('splitButton').addEventListener('click', function() {
  // Get the current time even if the stopwatch is stopped
  const splitTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${Math.floor(milliseconds / 100)}${String(milliseconds % 100).padStart(2, '0')}`;
  const splitElement = document.createElement('div');
  splitElement.textContent = splitTime;
  splitContainer.appendChild(splitElement);
});

document.getElementById('resetButton').addEventListener('click', function() {
  clearInterval(interval);
  running = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  document.getElementById('startstopButton').textContent = 'Start';
  splitContainer.innerHTML = '';
});
