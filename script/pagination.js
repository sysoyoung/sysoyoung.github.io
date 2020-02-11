function readClients() {
    let clients = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        clients[i] = JSON.parse(localStorage.getItem(key));
    }



    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);
}