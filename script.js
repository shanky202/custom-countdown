const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEle = document.getElementById('countdown');
const countdownEleTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEle = document.getElementById('complete');
const completeEleInfo = document.getElementById('complete-info');
const completeBtn =document.getElementById('complete-button')

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populat Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // Hide Input
    inputContainer.hidden = true;
    // If The countdown has Ended, Show Complete
    if (distance < 0 ) {
        countdownEle.hidden = true;
        clearInterval(countdownActive);
        completeEleInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEle.hidden = false;
    } else {
        //  Show the countdown in progress
        countdownEleTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEle.hidden = true;
        countdownEle.hidden = false;
    }
    }, 1000);
}

// Take Values From Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    // Check for valid date
    if (countdownDate === "") {
        alert("Please Select a Date for the Countdown")
    } else {
    // Get Number Version Of current Date, UpdateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    }
}

// Reset All Values
function reset() {
    // Hide Countdown,  Show Input
    countdownEle.hidden = true;
    inputContainer.hidden = false;
    completeEle.hidden = true;
    // Stop The Countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    conutdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePrevCountdown() {
    // Get countdown from Localstorage if avialable
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, Check Localstorage
restorePrevCountdown();
