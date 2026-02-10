
let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let score = 0;
let btns = ["yellow", "red", "blue", "green"]

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(!started){
        console.log("started !")
        started = true ;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250)
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250)
}


function levelUp(){
    userSeq = []
    level++;
    h2.innerText = `level ${level}`;
    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    
    let randomBtn = document.querySelector(`#${randomColor}`);
    // console.log(randomColor)
    // console.log(randomIdx);
    gameSeq.push(randomColor)
    console.log(gameSeq);

    gameFlash(randomBtn);

}

function check(idx){
    if( userSeq[idx] == gameSeq[idx]){
        // console.log("same value ");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        score = level - 1;
        h2.innerHTML = `Game Over ! Your score : <b>${score}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
        },1000)
        reset();
    }
}

function btnPress (){
    // console.log(this);
    if(!started) return ;
    let btn = this ;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    check(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for( let btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset (){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}