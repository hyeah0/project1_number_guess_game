// 랜덤번호 지정
// 유저가 번호를 입력 -> go버튼누름
// 유저가 랜덤번호를 맞추면, 맞췄습니다. 
// 랜덤번호가 유저번호보다 작을경우 down, 클경우 up
// reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 종료된다(더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 외 번호를 작성시 안내, 기회를 깍지 않는다.
// 유저가 이미 임력한 숫자를 또 입력하면, 안려준다, 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play_button");
let userInput = document.getElementById("user_input");
let resultArea = document.getElementById("result_Area");
let resetButton  = document.getElementById("reset_button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance_Area");
let history =[]

//버튼클릭시 게임시작
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){userInput.value="";});


//1부터 100까지 랜덤 숫자 뽑기
function pickRandomNum(){
    // Math.floor : 소수점 뒷자리는 제외
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답 : " + computerNum);
}

function play(){
    // console.log("게임시작");
    let userValue = userInput.value;

    //값 유효성 검사-----------------------------------
    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요"
        return; //1과 100사이 숫자가 아닐경우 안내문이 반목된다(하단 실행문 실행x)
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 값입니다. 다시 입력해주세요"
        return;
    }
    //---------------------------------------------------

    chances--;
    chanceArea.textContent =`남은기회:${chances}번`;
    // console.log("chance",chances);
      
    if(userValue < computerNum){
        resultArea.textContent = "UP!"
    }
    else if(userValue > computerNum) {
        resultArea.textContent = "DOWN!"
    }
    else {
        resultArea.textContent = "정답입니다!"
        gameOver=true;
    }
    
    history.push(userValue);
    console.log(history);


    // 5번 기회
    if(chances<1){
        gameOver = true;
    }
    if(gameOver==true){
        playButton.disabled =true;
    }

    
}

function reset(){
    // user input 창이 정리
    userInput.value =""
    // 새로운 번호가 생성
    pickRandomNum();

    resultArea.textContent="결과값이 나옵니다";
}



// 실행
pickRandomNum();
