// 랜덤번호를 추출한다(정답이 될 번호)

let computerNum ; 

function randomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답은: "+ computerNum);
}

randomNum();

// input에 값을 넣고 go를 누르면 번호에 따라 result_area 값이 달라진다

let resultArea = document.getElementById("result_Area");
let userNum = document.getElementById("user_input");
let playButton = document.getElementById("play_button");
let chances = 5; // 기회5번
let gameOver = false;
let chanceNum = document.getElementById("chance_Area");
let history=[];

playButton.addEventListener("click",result);
userNum.addEventListener("focus",function(){userNum.value=""})

function result(){
    let userNumValue = userNum.value;

    //---유효성검사---//
    if(userNumValue < 1 || userNumValue>100){
        resultArea.textContent = "1과 100사이 숫자를 입력하세요";
        return;
    }
    
    if(history.includes(userNumValue)){
        resultArea.textContent = "이미 입력한 값을 입력했습니다. 다른값을 입력해 주세요";
        return;
    }
    //--------------------------------------//

    //---버튼을 클릭하면 기회가 하나씩 준다---//
    chances --;
    chanceNum.textContent = `남은 기회 : ${chances}번`;
    //ㄴ 정적인 값과 동적인값을 동시 사용시 [`]기호 사용, 동적인 값은 ${} 대괄호 안에 넣는다

    //---입력값에 따라 출력값을 다르게 한다---//
    if(userNumValue < computerNum){
        resultArea.textContent = "UP!";
    }
    else if(userNumValue > computerNum){
        resultArea.textContent = "DOWN!";
    }
    else{
        resultArea.textContent = "정답입니다!";
        playButton.disabled=true;
    }

    //---입력값을 배열에 기록한다---//
    history.push(userNumValue);
    console.log(history);
   
    // 기회 5번 사용이 모두 되면 버튼이 disabled된다
    if(chances<1){
        gameOver = true;
    }

    if(gameOver==true){
        playButton.disabled = true;
    }
    
}

// 리셋을 누르면 리셋된다.

let resetButton = document.getElementById("reset_button");

resetButton.addEventListener("click",reset);

function reset(){
    //userinput 창 정리
    userNum.value=""
    //새로운 랜덤번호 발생
    randomNum();
    //결과창 수정
    resultArea.textContent = "결과가 나온다";
    //게임오버값 수정
    gameOver = false;
    //남은기회 리셋
    chanceNum.textContent = "기회 : 5번";
    //입력값 리셋
    console.log("입력값 리셋 전 입력한 값의 개수 : "+ history.length);
    history.splice(0,history.length);
    console.log("입력값 리셋 후 입력한 값의 개수 : " + history.length);
}
