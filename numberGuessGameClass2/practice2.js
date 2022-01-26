// 1. 랜덤값을 불러온다
// 2. 인풋값에 값을 입력하고 클릭버튼을 누르면 결과값이 나오고 기회가 하나가 준다
// 3. 기회는 총 5번
// 4. 인풋값에 한번 입력했던 숫자를 다시 쓰거나, 1~100사이 숫자가 아닌 다른 숫자를 썼을경우 기회는 줄 지 않는다.
// 5. 리셋버튼을 누르면 게임이 초기화 된다.

// -------------------------------------------------------------//
// 1. 랜덤값 부르기

let computerNum;

function randomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답은 : " + computerNum);
}

randomNum();

// -------------------------------------------------------------//
// 2. 인풋값에 값을 입력하고 클릭버튼을 누르면 결과값이 나온다

let userNumber = document.getElementById("user_number");
let result = document.getElementById("result");
let clickbutton = document.getElementById("click_button");
let time = document.getElementById("time");
let chances = 5;
let history = [];
let gameOver = false;
let reset = document.getElementById("reset");

clickbutton.addEventListener("click",play)
userNumber.addEventListener("focus",function(){userNumber.value=""});
reset.addEventListener("click",replay);

function play(){
    let userNumberValue = userNumber.value;

    ///---------- 유효성 검사 ----------///
    if(userNumberValue < 1 || userNumberValue > 100){
        result.textContent = "1부터 100까지 숫자를 입력하세요";
        return;
    }

    if(history.includes(userNumberValue)){
        result.textContent = "이미 입력했던 숫자입니다.";
        return;
    }

    chances -- ;
    time.textContent = `기회 : ${chances} 회`;

    if(userNumberValue < computerNum){
        result.textContent = "UP!";
    }
    else if(userNumberValue > computerNum){
        result.textContent = "Down!";
    }
    else{
        result.textContent = "정답입니다!";
        clickbutton.disabled = true;
    }

    //---*** 입력값을 배열에 기록한다 ***---//
    history.push(userNumberValue);
    console.log(history);

    //---*** 기회 5번 사용이 모두 되면 버튼이 disabled된다 ***---//
    if(chances<1){
        gameOver=true;
    }
    
    if(gameOver==true){
        clickbutton.disabled =true;
    }

}

// -------------------------------------------------------------//
// 3. 리셋한다

function replay(){
    userNumber.value="";
    randomNum();

    result.textContent = "결과가 나옵니다.";
    time.textContent = "기회 : 5회"
    clickbutton.disabled = false;

    chances = 5;
    console.log("초기화 후 기회 값 : "+chances);

    console.log("초기화 전 작성 값: " + history);
    history.splice(0,history.length);
    console.log("초기화 후 작성 값:" + history);

}

