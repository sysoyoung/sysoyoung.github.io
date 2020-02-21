// определение границ даты
function dateScope() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate() + 1;
    let nextDate = new Date(year, month, day + 30);

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let today = year + '-' + month + '-' + day;

    document.getElementById('resdate').value = today;
    document.getElementById('resdate').min = today;

    let nextYear = nextDate.getFullYear();
    let nextMonth = nextDate.getMonth();
    let nextDay = nextDate.getDate();

    if (nextMonth < 10) nextMonth = '0' + nextMonth;
    if (nextDay < 10) nextDay = '0' + nextDay;

    let lastDay = nextYear + '-' + nextMonth + '-' + nextDay;

    document.getElementById('resdate').max = lastDay;
}
dateScope();
// проверка на правильность введенной даты
function dateCheck() {

    let date = document.getElementById('resdate').value;

    let arrDate = date.split('-');

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();


    if (arrDate[0] < year || arrDate[0] > year + 1) {
        return false;
    }
    if (arrDate[1] < month || arrDate[1] > month + 1) {
        return false;
    }
    if (arrDate[2] < day + 1 || arrDate[2] > day + 30) {
        return false
    }

    return true;
}
//вывод схемы проверка на наличие столов
function searchTable() {

    if (!dateCheck()) {

        let date = document.getElementById('resdate');
        date.style.border = '1px solid red'

        setTimeout(() => date.removeAttribute('style'), 1000);
        return;
    }

    let elem = document.querySelector('.scheme-wrapper-block');
    elem.style.display = 'block';

    createMarginBottom('scheme');

    elem = document.querySelector('.select-date');
    elem.style.display = 'none';

    allGreen();
    let reservation = getDateReservation();

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let resCompare = JSON.parse(localStorage.getItem(key));
        if (reservation.date == resCompare.date && reservation.hour == resCompare.hour) {
            resTable(resCompare.table);
        }
    }

    capacity(reservation.guests);
}
// возвращает объект даты резервирования
function getDateReservation() {
    let date = document.getElementById('resdate').value;
    hour = document.getElementById('reshours').value;
    guests = document.getElementById('resnumber').value;

    return {
        date: date,
        hour: hour,
        guests: guests,
    }
}
// выбор стола и изменение его цвета
function selectTable(number) {

    let elem = document.querySelector(`.table${number}`);
    if (elem.id == 'red' || elem.id == 'grey' || elem.id == 'selected') {
        return
    }

    let selectedBefore = document.getElementById('selected');
    if (selectedBefore) {
        selectedBefore.id = "green";
    }

    elem.id = 'selected';

    let tableSelected = document.querySelector('.table-number');
    tableSelected.style.display = 'block';
    tableSelected.innerHTML = `Вы выбрали стол №${number}`;
}
// изменение цвета на красный
function resTable(table) {
    let elem = document.querySelector(`.table${table}`);
    elem.id = "red";
}
//изменение цвета на зеленый
function allGreen() {
    for (let i = 1; i <= 10; i++) {
        let elem = document.querySelector(`.table${i}`);
        elem.id = "green";
    }
}
// проверка столов на вместимость
function capacity(guests) {
    let tableCapacity = [2, 2, 5, 7, 6, 6, 6, 8, 8];

    for (let i = 0; i < tableCapacity.length; i++) {
        if (tableCapacity[i] < guests) {
            resTable(i + 1);
        }
    }
}
// кнопка назад
function back() {
    let elem = document.querySelector('.scheme-wrapper-block');
    elem.style.display = 'none';

    elem = document.querySelector('.select-date');
    elem.style.display = 'flex';

    createMarginBottom('date');

    let tableSelected = document.querySelector('.table-number');
    tableSelected.style.display = 'none';
}
// кнопка подтверждения выбора стола
function confirmSelect() {
    let selectedTable = document.querySelector('#selected');
    if (!selectedTable) {
        return;
    }

    let elem = document.querySelector('.scheme-wrapper-block');
    elem.style.display = 'none';

    elem = document.querySelector('#payform');
    elem.style.display = 'block';

    createMarginBottom('info');

    displayInfo();
}
// вывод введенной ранее информации
function displayInfo() {
    let dateInfo = getDateReservation();
    let selectedTable = document.querySelector('#selected');
    let tableInfo = selectedTable.getAttribute('number');

    let elem = document.querySelector('.date-info');
    elem.innerHTML = `Дата:  ${dateInfo.date}`;

    elem = document.querySelector('.time-info');
    elem.innerHTML = `Время:  ${dateInfo.hour}`;

    elem = document.querySelector('.table-info');
    elem.innerHTML = `Стол:  №${tableInfo}`;

    elem = document.querySelector('.cost-info');
    elem.innerHTML = `Стоимость:  ${250*dateInfo.guests}грн.`;
}
// подтверждение введеной информации
function confirmPayment() {

    let payInfo = getPaymentInfo();
    if (!payInfo) {
        return;
    }
    let dateInfo = getDateReservation();
    let selectedTable = document.querySelector('#selected');
    let tableInfo = selectedTable.getAttribute('number');

    let reservation = {
        date: dateInfo.date,
        hour: dateInfo.hour,
        guests: dateInfo.guests,
        table: tableInfo,
        name: payInfo.name,
        lastname: payInfo.lastname,
        email: payInfo.email,
        tel: payInfo.tel,
    }

    let resrv = JSON.stringify(reservation);
    localStorage.setItem(`${localStorage.length}`, resrv);

    successMessage();
}
// проверка введенной информации
function getPaymentInfo() {
    let name = document.querySelector('#payname').value;
    let lastname = document.querySelector('#paylastname').value;
    let email = document.querySelector('#payemail').value;
    let tel = document.querySelector('#paytel').value;

    let errorMsg = document.querySelector('.errormassage');

    if (name == '' || lastname == '' || email == '' || tel == '') {
        errorMsg.innerHTML = "Пожалуйста, заполните все поля";
        errorMsg.style.display = 'block';
        return null;
    }
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        errorMsg.innerHTML = "Неправильно введена почта";
        errorMsg.style.display = 'block';
        return null;
    }
    let phoneReg = /^\d[\d\(\)\ -]{8,13}\d$/;
    if (phoneReg.test(tel) == false) {
        errorMsg.innerHTML = "Неправильно введен номер телефона";
        errorMsg.style.display = 'block';
        return null;
    }
    errorMsg.style.display = 'none';
    return {
        name: name,
        lastname: lastname,
        email: email,
        tel: tel,
    }
}
// вывод сообщения о успешном бронировании
function successMessage() {
    elem = document.querySelector('.confirm-button');
    elem.style.display = 'none';

    elem = document.querySelector('.success');
    elem.style.display = 'block';
}

function alertAll() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        alert(`${key}: ${localStorage.getItem(key)}`);
    }
}

function wash() {
    localStorage.clear();
}
// изменение отступа до футера
function createMarginBottom(celector) {
    let elem = document.querySelector('.indent');
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    if (celector === 'date') {

        if (width > 823) {
            elem.style.marginBottom = '-249px';
        }
        if (width <= 823 && width > 425) {
            elem.style.marginBottom = '-149px';
        }
        if (width <= 425) {
            elem.style.marginBottom = '-79px';
        }
        if ((width > height) && (height <= 823 && height > 320 && width > 425 && width < 823)) {
            elem.style.marginBottom = '140px';
        }
    }
    if (celector === 'scheme') {
        elem.style.marginBottom = '250px';
        if ((width > height) && (height <= 823 && height > 320 && width > 425 && width < 823)) {
            elem.style.marginBottom = '640px';
        }
    }
    if (celector === 'info') {
        if (width > 823) {
            elem.style.marginBottom = '-100px';
        }
        if (width <= 823 && width > 425) {
            elem.style.marginBottom = '-20px';
        }
        if (width <= 425) {
            elem.style.marginBottom = '0px';
        }
        if ((width > height) && (height <= 823 && height > 320 && width > 425 && width < 823)) {
            elem.style.marginBottom = '255px';
        }
    }
}
// изменение отступа до футера при изменении екрана
function onResizeMarginBottom() {
    let elem = document.querySelector('.indent');
    let margin = elem.style.marginBottom;

    if (margin == '-79px' || margin == '140px') {
        createMarginBottom('date');
    }
    if (margin == '250px' || margin == '640px') {
        createMarginBottom('scheme');
    }
    if (margin == '0px' || margin == '255px') {
        createMarginBottom('info');
    }
}