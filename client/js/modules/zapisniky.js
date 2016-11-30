let video;
let form;
let days;
let hours;
let minutes;
let seconds;

let getRandomNumber = function (from, to) {
    return Math.floor(Math.random() * to) + from;
};

let getElementsPosition = function (elements, topFrom, topTo, leftFrom, leftTo) {

    let elementsLen = elements.length;

    for (let i = 0; i < elementsLen; i++) {
        elements[i].style.top = getRandomNumber(topFrom, topTo) + '%';
        elements[i].style.left = getRandomNumber(leftFrom, leftTo) + '%';
    }
};

let goToVideo = function (e) {
    e.preventDefault();
    let offset = video.offsetTop;
    window.scrollTo(0, offset);
};

let goToForm = function (e) {
    e.preventDefault();
    let offset = form.offsetTop;
    window.scrollTo(0, (offset + 50));
};

let makeLinksActive = function () {
    let scrollDown = document.getElementById('zapisnik-scroll-down');
    let scrollUp = document.getElementById('zapisnik-scroll-up');
    let goToFormButtons = document.getElementsByClassName('go-to-form-button');

    scrollDown.addEventListener('click', goToVideo);
    scrollUp.addEventListener('click', goToVideo);

    for (var i = 0; i < goToFormButtons.length; i++) {
        goToFormButtons[i].addEventListener('click', goToForm);
    }
};

let formSetup = function () {
    let formSubmit = document.getElementById('form-submit');
    let formCheckbox = document.getElementById('form-checkbox');

    formCheckbox.addEventListener('change', (e) => {
        if (formCheckbox.checked) {
            formSubmit.disabled = false;
        } else {
            formSubmit.disabled = true;
        }
    });
};

let setTimer = function() {
    let daysVal = Number(days.innerHTML);
    let hoursVal = Number(hours.innerHTML);
    let minutesVal = Number(minutes.innerHTML);
    let secondsVal = Number(seconds.innerHTML);


    if (secondsVal > 0) {
        secondsVal = secondsVal - 1;
    } else {
        secondsVal = 59;
        if (minutesVal > 0) {
            minutesVal = minutesVal - 1;
        } else {
            minutesVal = 59;
            if (hoursVal > 0) {
                hoursVal = hoursVal - 1;
            } else {
                hoursVal = 23;
                if (daysVal > 0) {
                    daysVal = daysVal - 1;
                } else {
                    daysVal = 0;
                }
            }
        }
    }

    days.innerHTML = (daysVal < 10) ? `0${daysVal}` : daysVal;
    hours.innerHTML = (hoursVal < 10) ? `0${hoursVal}` : hoursVal;
    minutes.innerHTML = (minutesVal < 10) ? `0${minutesVal}` : minutesVal;
    seconds.innerHTML = (secondsVal < 10) ? `0${secondsVal}` : secondsVal;

    setTimeout(setTimer, 1000);
};


export default class Zapisniky {
    init() {
        console.log(`ĎAKUJEME ZA VAŠU PODPORU! Tomáš a Tomáš / WEBtlak*`);
        console.log(`%c
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace");

        video = document.getElementById('zapisnik-video');

        if (video === null) {
            return false;
        }

        form = document.getElementById('form-wrapper');
        days = document.getElementById('days');
        hours = document.getElementById('hours');
        minutes = document.getElementById('minutes');
        seconds = document.getElementById('seconds');
        let heroes = document.getElementsByClassName('zapisnik-hrdinovia__hrdina');
        let moneyCounts = document.getElementsByClassName('zapisnik-video__money');

        getElementsPosition(heroes, 0, 90, 0, 75);
        getElementsPosition(moneyCounts, 0, 90, 0, 90);
        makeLinksActive();
        formSetup();
        setTimer();
    }
}