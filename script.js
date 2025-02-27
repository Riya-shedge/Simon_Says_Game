/*1)How to start? -> if keypress = start game
2)level 1 : + flash button
to store the seq : gameSeq []
                   userSeq[]
3)user input(event listener) -> check userpress = gamepress
  same -> level up
  not same -> game over */

  let gameSeq = [];
  let userSeq = [];

  let btns = ["yellow" , "red" , "green" , "purple"]

  let started = false;
  let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function() {
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
};

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let color = btns[randIdx];
    let randBtn = document.querySelector(`.${color}`);  //. string ka part hoga color is a variable
    // console.log(randIdx);
    // console.log(color);
    // console.log(randBtn);
    gameSeq.push(color);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]){
       if(userSeq.length === gameSeq.length){
        setTimeout(levelUp, 1000);
       } 
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start over`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";  
        },150 );
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click" , btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
