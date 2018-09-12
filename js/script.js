/*
 Реализовать секундомер с точностью до миллисекунд.

 Технические требования:
 - При запуске программы на экране должно быть табло с минутами, секундами и миллисекундами, а также две кнопки - Start и Clear.
 - При нажатии на кнопку Start - запускать отсчет секундомера. При этом вместо кнопки Start должна появиться кнопка Pause.
 - Нажатие кнопки Pause временно останавливает отсчет, до повторного нажатия кнопки Start.
 - Нажатие кнопки Clear останавливает отсчет (если он был запущен) и обнуляет таймер.
*/

let body = document.body;
let start = document.querySelector('.start');
let stop = document.querySelector('.stop');
let reset = document.querySelector('.reset');
let lap = document.querySelector('.lap');
let lapContainer = document.querySelector('.lapContainer');
let mil = document.querySelector('.milis');
let sec = document.querySelector('.secs');
let min = document.querySelector('.mins');
let hours = document.querySelector('.hours');
let flag = false;

let createTimeSection = (timeType) => { // timeType = min/sec/ms/ :
    let lapTime = document.createElement('div');
    lapTime.classList.add('lapSection');
    lapBlock.appendChild(lapTime);
    lapTime.innerHTML = (timeType);
};

let createTimeBlock = (type) => {
    lapBlock = document.createElement('div');
    lapBlock.classList.add('lapBlock');
    lapContainer.appendChild(lapBlock);
    let lapText = document.createElement('div');
    lapText.classList.add('lapText');
    lapBlock.appendChild(lapText);
    lapText.innerHTML = (type);
    createTimeSection(hours);
    createTimeSection(':');
    createTimeSection(minutes);
    createTimeSection(':');
    createTimeSection(seconds);
    createTimeSection(':');
    createTimeSection(milliseconds);
};

let displayStopButton = () => {
    start.style.display = 'none';
    stop.style.display = 'block';
};

let displayStartButton = () => {
    start.style.display = 'block';
    stop.style.display = 'none';
};

let startStopwatch = () => {
    if(!flag) initialDate = new Date;
};

let getTime = () => {
    let currentDate = new Date;
    timer = new Date (currentDate - initialDate);
    milliseconds = timer.getMilliseconds();
    seconds = timer.getSeconds();
    minutes = timer.getMinutes();
    hours = timer.getUTCHours();
    if(milliseconds < 100){
        milliseconds = '0' + milliseconds;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    if (hours < 10){
        hours = '0' + hours;
    }
};

let counter = () => {
    getTime();
    mil.innerHTML = milliseconds;
    sec.innerHTML = seconds;
    min.innerHTML = minutes;
    hours.innerHTML = hours;
};

let displayTimer = () => {
    timerId = setInterval(counter, 10);
};

let stopTimer = () => {
    clearInterval(timerId);
    getTime();
    flag = true;
};

let newLap = () => {
    if (flag === true){
        getTime();
        createTimeBlock('LAP');
    } else {
        lapBlock = document.createElement('div');
        lapBlock.classList.add('lapBlock');
        lapContainer.appendChild(lapBlock);
        let lapText = document.createElement('div');
        lapText.classList.add('lapText');
        lapBlock.appendChild(lapText);
        lapText.innerHTML = ('PRESS START FIRST');
    }
};

let resetTimer = () => {
    flag = false;
    clearInterval(timerId);
    start.style.display = 'block';
    stop.style.display = 'none';
    mil.innerHTML = '00';
    min.innerHTML = '00';
    sec.innerHTML = '00';
    document.querySelector('.lapContainer').innerHTML = '';
};

start.addEventListener('click', startStopwatch);
start.addEventListener('click', displayStopButton);
start.addEventListener('click', displayTimer);
lap.addEventListener('click', newLap);
stop.addEventListener('click', stopTimer);
stop.addEventListener('click', displayStartButton);
reset.addEventListener('click', resetTimer);