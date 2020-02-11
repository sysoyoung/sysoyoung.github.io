function xmark() {
    let elem = document.querySelector('.menu-button_active');
    if (elem) {
        elem.classList.remove('menu-button_active');

    } else {
        elem = document.querySelector('.menu-button');
        elem.classList.add('menu-button_active');
    }
}