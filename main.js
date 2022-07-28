let playerCharacter = 'x';
let opponentCharacter = 'o';
let versus = "pc";
let leftBtns = new Array();

let turn = 0 , onPlay = 0;

let playerChoosedO = document.querySelector("#opicked");
let playerChoosedX = document.querySelector("#xpicked");

playerChoosedO.onclick = function(){
    playerCharacter = 'o';
    opponentCharacter = 'x';
    onPlay = 1;
    playerChoosedO.classList.add("clicked");
    playerChoosedX.classList.remove("clicked");
};

playerChoosedX.onclick = function(event){
    playerCharacter = 'x';
    opponentCharacter = 'o';
    onPlay = 0;
    playerChoosedX.classList.add("clicked");
    playerChoosedO.classList.remove("clicked");
};


function gameOn(){
    for(let i = 1; i <= 9; i++){
        leftBtns.push(i);
    }

    if(versus == "pc" && onPlay === 1){
        randomizer();
    }
    document.getElementById("game").style.display = "block";
}

function hoveredTile(){
    console.log(this);
}

document.querySelector("#vspc").onclick = function(){
    versus = "pc";
    document.querySelector("#starter").remove();

    gameOn();
};

document.querySelector("#vsh").onclick = function(){
    versus = "human";
    document.querySelector("#starter").remove();

    gameOn();
};

function editTurn(to){
    let target = document.getElementById("player-turn");
    target.innerHTML = "";

    let img = document.createElement("img");
    img.src = "images/" + ((to === 0) ? 'x' : 'o') + '-hole.svg';

    target.append(img)

}

function markButton(btnId){
    if(leftBtns.includes(btnId) === false)
        return;

    let img = document.createElement("img");
    
    img.src = "images/" + ((turn === 0) ? "x" : "o") + ".svg";
    img.classList.add("taken");

    document.getElementById(btnId).append(img);

    turn = 1 - turn;
    leftBtns = leftBtns.filter((e) => {
        return e != btnId;
    });
}

function randomizer(){
    let pickerIdx = Math.floor(Math.random() * leftBtns.length);
    markButton(leftBtns[pickerIdx]);
}

function doButton(btnId){
    if( (versus === "pc" && turn === onPlay) ){
        markButton(btnId);
        check();

        randomizer();
        check();

        editTurn(turn);
    } else if(versus === "human"){
        markButton(btnId);
        editTurn(turn);
        check();
    }
}

function getBtnValue(btnNumber){
    btnNumber--;
    let img = document.querySelector(".box").children[btnNumber].querySelector("img");
    if(img != null && img.hasAttribute("src")){
        if(img.getAttribute("src") === "images/x.svg")
            return 1;
        return 2;
    }
    return 0;
}

function checker(){
    let c0 = getBtnValue(1);
    let c1 = getBtnValue(2);
    let c2 = getBtnValue(3);
    let c3 = getBtnValue(4);
    let c4 = getBtnValue(5);
    let c5 = getBtnValue(6);
    let c6 = getBtnValue(7);
    let c7 = getBtnValue(8);
    let c8 = getBtnValue(9);

    //mainDiagonal
    if(c0 > 0 && c0 === c4 && c4 === c8){
        return c0;
    }
    //cross diagonal
    if(c2 > 0 && c2 === c4 && c4 === c6){
        return c2;
    }
    //row 1
    if(c0 > 0 && c0 === c1 && c1 === c2){
        return c0;
    }
    //row 2
    if(c3 > 0 && c3 === c4 && c4 === c5){
        return c3;
    }
    //row 3
    if(c6 > 0 && c6 === c7 && c7 === c8){
        return c6;
    }

    //col 1
    if(c0 > 0 && c0 === c3 && c3 === c6){
        return c0;
    }
    //col 2
    if(c1 > 0 && c1 === c4 && c4 === c7){
        return c1;
    }
    //col 3
    if(c2 > 0 && c2 === c5 && c5 === c8){
        return c2;
    }
    
    return 0;
}


function check(){
    let ret = checker();
    if(ret === 0)
        return;
    
    
    document.body.classList.add("blur");
    document.body.style.zIndex = 1;
    document.body.innerHTML = "";
    
    let popup = document.createElement("div");
    popup.classList.add("container");

    let img = document.createElement("img");
    img.src = "images/xologo.svg"
    img.style.width = "100%";
    img.style.height = "70%";

    let title = document.createElement("h1");
    title.style.fontSize = "4em";
    title.innerText = "Player " + ret + " won the match!";

    popup.appendChild(img);
    popup.appendChild(title);

    document.body.prepend(popup);
    
    document.getElementById("game").style.display = "none";
}