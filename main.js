const WIDTH = 4;
const HEIGHT = 8;
let X=0;
let Y=0;
let app=document.getElementById('app');
let log=document.getElementById('log');

let wall=[
    [0,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,1,1,1],
    [0,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [1,0,1,1]
];


function drowMap() {
    let map='';
    for (i=0; i<HEIGHT; ++i) {
        map += '<div class="row">';
        for (j=0; j<WIDTH; ++j) {
            if(wall[i][j]===1){
                map += '<div class="col wall"></div>';
            }else {
                if (i === Y && j === X) {
                    map += '<div class="col cur"></div>';
                }
                else if ((j === (X - 1) || j === (X + 1)) && i === Y) {
                    map += '<div class="col green" onclick="goTo(' + j + ',' + i + ')"></div>';
                }
                else if ((i === (Y - 1) || i === (Y + 1)) && j === X) {
                    map += '<div class="col green" onclick="goTo(' + j + ',' + i + ')"></div>';
                }
                else {
                    map += '<div class="col"></div>';
                }
            }
        }
        map += '</div>';
    }
    app.innerHTML=map;
    let cell = document.getElementsByClassName("col")[7*WIDTH + 1];
    cell.classList.add('exit');
}

function setPerson(){

    let cell = document.getElementsByClassName("col")[Y*WIDTH + X];
    let man = document.getElementsByClassName("man")[0];
    if(man){
        man.parentNode.removeChild(man);
    }
    cell.innerHTML += '<img class="man" src="img/man.png">';
}

function rotate(deg){
    let man = document.getElementsByClassName("man")[0];
    man.style.transform = "rotate("+deg+"deg)";
}

function goTo(x,y){
    switch (X-x){
        case 0:
            if((Y-y)===1){
                up();
            }else{
                down();
            }
            break;
        case 1:
            left();
            break;
        case -1:
            right();
            break;
    }
}

function pushToLog(str){
    let now = new Date();
    let messeges=log.innerHTML;
    log.innerHTML=now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+' '+str+'<br>';
    log.innerHTML+=messeges;
}

function left(){
    if(X > 0 && wall[Y][X-1]===0){
        --X;
        drowMap();
        setPerson(X,Y);
        rotate(90);
        pushToLog('Иду налево!');
    }else{
        pushToLog('Не могу лазить по стенам!');
    }

}
function right(){
    if(X < WIDTH-1 && wall[Y][X+1]===0){
        ++X;
        drowMap();
        setPerson(X,Y);
        rotate(270);
        pushToLog('Направо так направо!');
    }else{
        pushToLog('Не заставляй лезть туда!');
    }
}
function up(){
    if(Y > 0 && wall[Y-1][X]===0) {
        --Y;
        drowMap();
        setPerson(X,Y);
        rotate(180);
        pushToLog('Только наверх!');
    }else {
        pushToLog('Я не супер мен!');
    }

}
function down(){
    if(X===1 && Y===7){
        alert('Умничка! Ты выбрался из комнаты!');
        X=0;
        Y=0;
        drowMap();
        setPerson(X,Y);
        rotate(0);
    }
    if(Y < HEIGHT-1 && wall[Y+1][X]===0){
        ++Y;
        drowMap();
        setPerson(X,Y);
        rotate(0);
        pushToLog('Блииин снова вниз!');
    }else {
        pushToLog('Там лава!');
    }

}



drowMap();
setPerson();

addEventListener("keydown", function(e){
    switch(e.keyCode){
        case 37: //left
            left();
            break;
        case 38: //up
            up();
            break;
        case 39: //right
            right();
            break;
        case 40: //down
            down();
            break;
    }
});

setInterval(function(){
    if(Y<7 && wall[Y+1][X]===0){
        down();
    }else{
        right();
    }
},1000);