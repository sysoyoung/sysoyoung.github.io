function dateScope() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
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


function searchTable() {

    let elem = document.querySelector('.scheme');
    elem.style.display = 'block';

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
    //alert(localStorage.length)
}

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
    tableSelected.innerHTML = `Вы выбрали стол номер: ${number}`;
}

function resTable(table) {
    let elem = document.querySelector(`.table${table}`);
    elem.id = "red";
}

function allGreen() {
    for (let i = 1; i <= 10; i++) {
        let elem = document.querySelector(`.table${i}`);
        elem.id = "green";
    }
}

function capacity(guests) {
    let tableCapacity = [2, 2, 5, 7, 6, 6, 6, 8, 8];

    for (let i = 0; i < tableCapacity.length; i++) {
        if (tableCapacity[i] < guests) {
            resTable(i + 1);
        }
    }
}

function back() {
    let elem = document.querySelector('.scheme');
    elem.style.display = 'none';

    elem = document.querySelector('.select-date');
    elem.style.display = 'block';

    let tableSelected = document.querySelector('.table-number');
    tableSelected.style.display = 'none';
}

function confirmSelect() {
    let selectedTable = document.querySelector('#selected');
    if (!selectedTable) {
        return;
    }

    let elem = document.querySelector('.scheme');
    elem.style.display = 'none';

    elem = document.querySelector('#payform');
    elem.style.display = 'block';
}

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

function successMessage() {
    elem = document.querySelector('#payform');
    elem.style.display = 'none';

    elem = document.querySelector('.success');
    elem.style.display = 'block';
}

function onStart() {
    elem = document.querySelector('.success');
    elem.style.display = 'none';

    elem = document.querySelector('.select-date');
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