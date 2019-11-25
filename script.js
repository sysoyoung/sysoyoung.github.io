import {mainArr} from './figure.js';

let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', function (e){
    if(e.target.classList.contains('easy')){
        speed = 1000;
    } else if(e.target.classList.contains('normal')){
        speed = 700;
    } else if(e.target.classList.contains('hard')){
        speed = 400;
    }

    if(e.target.classList.contains('button')){
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();
    }
})

function startGame() {

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
    
    let x = 5;
    let y = 19;
    
    let currentFigure = 0;
    let figureBody = 0;
    let rotate = 1;
    
    function getRandom(){
        let rand = Math.random() * (mainArr.length) - 0.5;
        return  Math.round(rand);
    }
    
    function addClass(action_class){
        for(let i = 0; i < figureBody.length; i++){
            figureBody[i].classList.add(`${action_class}`);
        }
    }
    
    function removeClass(action_class){
        for(let i = 0; i < figureBody.length; i++){
            figureBody[i].classList.remove(`${action_class}`);
        }
    }
    
    function createFigure(){
        currentFigure = getRandom();
        rotate = 1;
    
        figureBody = [
            document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
        ];
    
        addClass('figure');
    }

    createFigure();
    
    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Score: ${score}`;
    
    function figureFall(){

        let mooveFlag = true;
        let coordinates = [
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
        ];
        
        for(let i = 0; i < coordinates.length; i++){
            if(coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')){
                mooveFlag = false;
                break;
            }
        }
        
        if (mooveFlag){
    
            removeClass('figure');
            
            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
            ];
    
            addClass('figure');
            
        }else{
            removeClass('figure');
            addClass('set');
            for(let i = 1; i < 19; i++){
                let count = 0;
                for(let k = 1; k < 11; k++){
                    if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
                        count++;
                        if(count == 10){
                            score += 10;
                            input.value = `Score: ${score}`;
                            for(let m = 1; m < 11; m++){
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
                            }
                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for(let s = 0; s < set.length; s++){
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                if(setCoordinates[1] > i){
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                }
                            }
                            for(let c = 0; c < newSet.length; c++){
                                newSet[c].classList.add('set');
                            }
                            i--;
                        }
                    }
                }
            }
            for(let i = 1; i < 11; i++){
                if(document.querySelector(`[posX = "${i}"][posY = "19"]`).classList.contains('set')){
                    clearInterval(interval);
                    return endGame();
                }
            }
            createFigure();
        }
    }
    
    function endGame(){
        let end = document.querySelector('.endgame');

        end.style.display = 'flex';

        let lastScore = end.getElementsByClassName('qwer')[0];
        lastScore.innerHTML = `Your score is ${score}`; 
        
        end.addEventListener('click', function (e){
            if(e.target.classList.contains('restart')){
                end.style.display = 'none';
                modal.style.display = '';
                overlay.style.display = '';
                tetris.remove();
                figureBody = null;
            } else if(e.target.classList.contains('quit')){
                window.close();
            }
        })
    }

    

    let interval = setInterval(() => {
        figureFall();
    }, speed);
    
    let flag = true;
    
    window.addEventListener('keydown', function (e) {
        
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
    
        function getNewState(a){
    
            flag = true;
            
            let newFigure = [
                document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${+coordinates1[1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${+coordinates2[1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${+coordinates3[1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${+coordinates4[1]}"]`),
            ];
            
            for(let i = 0; i < newFigure.length; i++){
                if(!newFigure[i] || newFigure[i].classList.contains('set')){
                    flag = false;
                }
            }
            
            if (flag == true){
                removeClass('figure');
                figureBody = newFigure;
                addClass('figure');
            }
        }
    
        if(e.keyCode == 37 || e.keyCode == 65){
            getNewState(-1);
        } else if(e.keyCode == 39 || e.keyCode == 68){
            getNewState(1);
        } else if(e.keyKode == 40  || e.keyCode == 83){
            figureFall();
        }else if(e.keyCode == 38 || e.keyCode == 87){
            flag = true;
    
            let newFigure = [
                document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] +  mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] +  mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] +  mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] +  mainArr[currentFigure][rotate + 2][3][1]}"]`),
            ];
          
            for(let i = 0; i < newFigure.length; i++){
                if(!newFigure[i] || newFigure[i].classList.contains('set')){
                    flag = false;
                }
            }
            
            if (flag == true){
                removeClass('figure');
                figureBody = newFigure;
                addClass('figure');
                
                if(rotate < 4){
                    rotate++;
                } else {
                    rotate = 1;
                }
            }
        }
    
    })
    
    
}