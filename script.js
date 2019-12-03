//import {mainArr} from './figure.js';

let mainArr = [
    //straight
    [
        [0, 1],
        [0, 2],
        [0, 3],
        // 90d turn
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // 180d turn
        [
            [1, -1],
            [0, 0],
            [-1 ,1],
            [-2, 2],
        ],
        // 270d turn
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // 360d turn
        [
            [1, -1],
            [0, 0],
            [-1 ,1],
            [-2, 2],
        ],
    ],
    //square
    [
        [1, 0],
        [0, 1],
        [1, 1],
        // 90d turn
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // 180d turn
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // 270d turn
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // 360d turn
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    ],
    // L
    [
        [1, 0],
        [0, 1],
        [0, 2],
        // 90d turn
        [
            [-1, 0],
            [-2, 1],
            [0, 0],
            [1, -1],
        ],
        // 180d turn
        [
            [2, 0],
            [2, 0],
            [0, 1],
            [0, 1],
        ],
        // 270d turn
        [
            [-2, 1],
            [-1, 0],
            [1, -1],
            [0, 0],
        ],
        // 360d turn
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0],
        ],
    ],
    // inverted L
    [
        [1, 0],
        [1, 1],
        [1, 2],
        // 90d turn
        [
            [0, 1],
            [0, 1],
            [1, 0],
            [-1, 0],
        ],
        // 180d turn
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0],
        ],
        // 270d turn
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1],
        ],
        // 360d turn
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1],
        ],
    ],
    // stair right
    [
        [1, 0],
        [-1, 1],
        [0, 1],
        // 90d turn
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        // 180d turn
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
        // 270d turn
        [
            [-1, 0],
            [-2, 1],
            [1, 0],
            [0, 1],
        ],
        // 360d turn
        [
            [1, 1],
            [2, 0],
            [-1, 1],
            [0, 0],
        ],
    ],
    // stair left
    [
        [1, 0],
        [1, 1],
        [2, 1],
        // 90d turn
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        // 180d turn
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
        // 270d turn
        [
            [1, 0],
            [-1, 1],
            [0, 0],
            [-2, 1],
        ],
        // 360d turn
        [
            [-1, 1],
            [1, 0],
            [0, 1],
            [2, 0],
        ],
    ],
    // lego
    [
        [1, 0],
        [2, 0],
        [1, 1],
        // 90d turn
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        // 180d turn
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1],
        ],
        // 270d turn
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [-1, 1],
        ],
        // 360d turn
        [
            [-1, 1],
            [1, 0],
            [1, 0],
            [0, 0],
        ],
    ]     
];

mainMenu();

function mainMenu(){

    let modal = document.querySelector('.modal');
    let overlay = document.querySelector('.overlay');

    modal.style.display = 'none';
    overlay.style.display = 'none';

    modal.style.display = '';
    overlay.style.display = '';

    let func = function (e){
    
        let speed = 0;
    
        if(e.target.classList.contains('easy')){
            speed = 1000;
        } else if(e.target.classList.contains('normal')){
            speed = 700;
        } else if(e.target.classList.contains('hard')){
            speed = 300;
        }
    
        if(e.target.classList.contains('button')){
            modal.style.display = 'none';
            overlay.style.display = 'none';
            modal.removeEventListener('click', func);
            createBoard();
            startGame(speed);
            
        }
    };

    modal.addEventListener('click', func);
}

function createBoard(){

    let tetris = document.createElement('div');
    tetris.classList.add('tetris');
    
    for(let i = 1; i <= 220; i++){
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }
    
    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel');
    let i = 0;
    for (let y = 22; y > 0; y--) {
        for(let x = 1; x < 11; x++){
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++; 
        }
    }
}

function startGame(speed) {

    let figure = {
        figureBody : 0,
        currentFigure : 0,
        rotate : 0,
    };

    figure.currentFigure = numberOfCurrentFigure();
    let copyFigure = createFigure(figure.currentFigure);

    figure.figureBody = copyFigure.copyFigureBody;
    figure.rotate = copyFigure.copyRotate;

    createScore();
    
    let interval = setInterval(() => {
        figure = figureMove(figure);
        if(figure == null){
            clearInterval(interval);
            window.removeEventListener('keydown', func);
            endGame(speed);           
        }
    }, speed);

    let func = function(e){
        figure = figureControl(e, figure);
    }

    window.addEventListener('keydown', func);    
}

function addClass(action_class, figureBody){////////////////////////////////
    for(let i = 0; i < figureBody.length; i++){
        figureBody[i].classList.add(`${action_class}`);
    }
}

function removeClass(action_class, figureBody){/////////////////////////////
    for(let i = 0; i < figureBody.length; i++){
        figureBody[i].classList.remove(`${action_class}`);
    }
}

function numberOfCurrentFigure(){
    let currentFigure = 0;
    
    let rand = Math.random() * (mainArr.length) - 0.5;
    currentFigure = Math.round(rand);
    
    return currentFigure;
}

function createFigure(currentFigure){
    
    let x = 5;
    let y = 19;
    let figureBody = 0;
    let rotate = 3;
    
    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
    ];

    addClass('figure', figureBody);

    return {
        copyFigureBody : figureBody,
        copyRotate : rotate,
    };
}

/////////////////////////////////////
function createScore(){
    let input = document.getElementsByTagName('input')[0];
    input.value = `Score: 0`;
}
///////////////////////////////////
function increaseScore(){
    let input = document.getElementsByTagName('input')[0];
    score = +getScore() + 10;
    input.value = `Score: ${score}`;
}

function getScore(){
    let input = document.getElementsByTagName('input')[0];
    score = input.value.slice(6);

    return score;
}
//////////////////////////////

function figureMove(figure){

    if(figure == null){
        return null;
    }

    figureBody = figure.figureBody;

    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
    ];
    
    let mooveFlag = checkMoveFlag(coordinates);

    if (mooveFlag){
            
        figure.figureBody = figureFall(figureBody, coordinates);       
        
    }else{
        removeClass('figure', figureBody);
        addClass('set', figureBody);
        
        searchFullSetRowAndDelete();
///////////////////////// end game
        let end = checkEndGame();
        
        if(!end){
            figure.currentFigure = numberOfCurrentFigure();
            let copyFigure = createFigure(figure.currentFigure);

            figure.figureBody = copyFigure.copyFigureBody;
            figure.rotate = copyFigure.copyRotate;
        }else{
            return null;
        }
    }
    return figure;
}

function checkMoveFlag(coordinates){
    for(let i = 0; i < coordinates.length; i++){
        if(coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')){
            return false;
        }
    }
    return true;
}

function figureFall(figureBody, coordinates){
    removeClass('figure', figureBody);
    figureBody = [
        document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
        document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
        document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
        document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
    ];
    addClass('figure', figureBody);

    return figureBody;
}

function searchFullSetRowAndDelete(){
    for(let i = 1; i < 19; i++){
        let count = 0;
        for(let k = 1; k < 11; k++){
            if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
                count++;
            }
        }
        if(count == 10){
            increaseScore();
            setCellFall(i);
            i--;
        }
    }
}

function setCellFall(fullRow){
    for(let m = 1; m < 11; m++){
        document.querySelector(`[posX = "${m}"][posY = "${fullRow}"]`).classList.remove('set');
    }

    let setFigure = document.querySelectorAll('.set');
    let newSet = [];
    for(let s = 0; s < setFigure.length; s++){
        let setCoordinates = [setFigure[s].getAttribute('posX'), setFigure[s].getAttribute('posY')];
        if(setCoordinates[1] > fullRow){
            setFigure[s].classList.remove('set');
            newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
        }
    }

    for(let m = 0; m < newSet.length; m++){
        newSet[m].classList.add('set');
    }
}

function checkEndGame(){
    for(let i = 1; i < 11; i++){
        if(document.querySelector(`[posX = "${i}"][posY = "19"]`).classList.contains('set')){
            return true;
        }
    }
    return false;
} 

function figureControl(e, figure) {
    
    figureBody = figure.figureBody;
    currentFigure = figure.currentFigure;
    rotate = figure.rotate;

    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

    if(e.keyCode == 37 || e.keyCode == 65){
        figureBody = getNewState(-1,figureBody, [coordinates1, coordinates2, coordinates3, coordinates4]);
    } else if(e.keyCode == 39 || e.keyCode == 68){
        figureBody = getNewState(1, figureBody, [coordinates1, coordinates2, coordinates3, coordinates4]);
    } else if(e.keyKode == 40  || e.keyCode == 83){
        return figureMove(figure);
    }else if(e.keyCode == 38 || e.keyCode == 87){
        let flag = true;

        let newFigure = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate][0][0]}"][posY = "${+coordinates1[1] +  mainArr[currentFigure][rotate][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate][1][0]}"][posY = "${+coordinates2[1] +  mainArr[currentFigure][rotate][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate][2][0]}"][posY = "${+coordinates3[1] +  mainArr[currentFigure][rotate][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate][3][0]}"][posY = "${+coordinates4[1] +  mainArr[currentFigure][rotate][3][1]}"]`),
        ];
        
        for(let i = 0; i < newFigure.length; i++){
            if(!newFigure[i] || newFigure[i].classList.contains('set')){
                flag = false;
            }
        }
        
        if (flag == true){
            removeClass('figure', figureBody);
            figureBody = newFigure;
            addClass('figure', figureBody);
            
            if(rotate < 6){
                rotate++;
            } else {
                rotate = 3;
            }
        }
    }

    figure.figureBody = figureBody;
    figure.currentFigure = currentFigure;
    figure.rotate = rotate;

    return figure;
}

function getNewState(a, figureBody, coordArr){
    
    let flag = true;
    
    let newFigure = [
        document.querySelector(`[posX = "${+coordArr[0][0] + a}"][posY = "${+coordArr[0][1]}"]`),
        document.querySelector(`[posX = "${+coordArr[1][0] + a}"][posY = "${+coordArr[1][1]}"]`),
        document.querySelector(`[posX = "${+coordArr[2][0] + a}"][posY = "${+coordArr[2][1]}"]`),
        document.querySelector(`[posX = "${+coordArr[3][0] + a}"][posY = "${+coordArr[3][1]}"]`),
    ];
    
    for(let i = 0; i < newFigure.length; i++){
        if(!newFigure[i] || newFigure[i].classList.contains('set')){
            flag = false;
        }
    }
    
    if (flag == true){
        removeClass('figure', figureBody);
        figureBody = newFigure;
        addClass('figure', figureBody);
    }

    return figureBody;
}

function endGame(speed){
    let end = document.querySelector('.endgame');

    end.style.display = 'flex';

    let lastScore = end.getElementsByClassName('qwer')[0];
    lastScore.innerHTML = `Your score is ${getScore()}`; 
    
    let screen = document.getElementsByClassName('game')[0];
    screen.style.opacity = 0.5;

    let tetris = document.getElementsByClassName('tetris')[0];

    let func = function (e){
        end.removeEventListener('click', func);
        if(e.target.classList.contains('restart')){
            end.style.display = 'none';
            screen.style.opacity = 1;
            tetris.remove();
            createBoard();
            startGame(speed);
        } 
        if(e.target.classList.contains('quit')){
            end.style.display = 'none';
            tetris.remove();
            screen.style.opacity = 1;
            mainMenu()
        }
    };

    end.addEventListener('click', func);
}