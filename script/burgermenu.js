//изменение меню
function xmark() {
    let elem = document.querySelector('.menu-button_active');
    if (elem) {
        elem.classList.remove('menu-button_active');

        resizeHeader('0.5s', 'high');
    } else {
        elem = document.querySelector('.menu-button');
        elem.classList.add('menu-button_active');

        resizeHeader('0.5s', 'low');
    }
}
//изменение высоты хедера
function resizeHeader(time, hight) {
    let header = document.querySelector('header');
    header.style.height = `${getHight(hight)}px`;
    header.style.transition = `${time}`;
}
// получение высоты хедера
function getHight(hight) {
    if (hight == 'high') {
        if (document.documentElement.clientWidth <= 425 || document.documentElement.clientHeight <= 425) {
            return 80;
        } else {
            return 110;
        }
    } else {
        if (document.documentElement.clientWidth <= 425 || document.documentElement.clientHeight <= 425) {
            return 325;
        } else {
            return 435;
        }
    }
}
// изменение хедера при изменении размера екрана
function changeHeader() {
    let elem = document.querySelector('.menu-button_active');
    if (elem) {
        resizeHeader('0s', 'low');
    } else {
        elem = document.querySelector('.menu-button');
        resizeHeader('0s', 'high');
    }
    if (document.documentElement.clientWidth > 800) {
        document.querySelector('header').removeAttribute("style");
    }
};