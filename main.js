// 1. 랜덤값
// 2. 결과값 수정
// 3. 1~100이 아닌수일경우 다시
// 4. 기회는 5번

let computerNum;

function randomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답 : " + computerNum);
}

randomNum();

//-----------------------------------------------------//

let userNum = document.getElementById("userNum");
let result = document.getElementById("result");
let play = document.getElementById("play");
let times = document.getElementById("times");
let chances = 5;
let history = [];
let gameOver = false;
let reset = document.getElementById("reset");

play.addEventListener("click",playGame);
userNum.addEventListener("focus",function(){userNum.value=""});
reset.addEventListener("click",replay);

function playGame(){
    let userNumValue = userNum.value;

    //-----유효성검사----//
    if(userNumValue<1 || userNumValue>100){
        result.textContent = "1부터 100까지 숫자를 입력하세요"
        return;
    }

    if(history.includes(userNumValue)){
        result.textContent = "입력 했던 숫자입니다. 다른 숫자를 입력해 주세요"
        return;
    }

    if(userNumValue<computerNum){
        result.textContent = "UP!"
    }
    else if(userNumValue>computerNum){
        result.textContent = "down!"
    }
    else{
        result.textContent = "정답입니다!"
        play.disabled=true;
    }

    chances --;
    times.textContent = `기회 : ${chances}회`
    history.push(userNumValue);
    console.log(history);

    if(chances<1){
        gameOver=true;
    }
    
    if(gameOver==true){
        play.disabled=true;
    }
}

function replay(){
    
    result.textContent = "결과는?"
    times.textContent = "기회 : 5회";
    chances = 5;
    userNum.value="";
    play.disabled=false;
    randomNum();

    console.log("배열 삭제 전" + history.length);
    history.splice(0,history.length);
    console.log("배열 삭제 후" + history.length);

}