let video;
let form;

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

let goToVideo = function(e) {
    e.preventDefault();
    let offset = video.offsetTop;
    window.scrollTo(0, offset);
};

let goToForm = function(e) {
    e.preventDefault();
    let offset = form.offsetTop;
    window.scrollTo(0, offset);
};

let makeLinksActive = function () {
    let scrollDown = document.getElementById('zapisnik-scroll-down');
    let scrollUp = document.getElementById('zapisnik-scroll-up');
    let goToForm1 = document.getElementById('go-to-form-1');
    //let goToForm2 = document.getElementById('go-to-form-2');

    scrollDown.addEventListener('click', goToVideo);
    scrollUp.addEventListener('click', goToVideo);
    goToForm1.addEventListener('click', goToForm);
    //goToForm2.addEventListener('click', goToForm);
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


export default class Zapisniky {
    init() {
        console.log(`ĎAKUJEME ZA PODPORU! TomášaTomáš / WEBtlak*`);
        video = document.getElementById('zapisnik-video');
        form = document.getElementById('form-wrapper');

        let heroes = document.getElementsByClassName('zapisnik-hrdinovia__hrdina');
        let moneyCounts = document.getElementsByClassName('zapisnik-video__money');

        getElementsPosition(heroes, 0, 90, 0, 75);
        getElementsPosition(moneyCounts, 0, 90, 0, 90);
        makeLinksActive();
        formSetup()
    }
}