import { questions } from "./questions.js";

const key_board = document.querySelectorAll(".key_board input");
const questionVar = document.querySelector(".question");
const scoreVar = document.querySelector(".score span");
let score = 0;
let TimerValue = 59;
let answer = "";
let randomNumber = Math.floor(Math.random() * 24);


let Timer = document.querySelector(".time");
// let done = false;
let TimeInterval = setInterval(() => {
  Timer.textContent = TimerValue;
  if (TimerValue == 0) {
    // TimerValue = 0;
    // done = true;
    // SubmitData(score);
    clearInterval(TimeInterval);
    window.alert(`Game Over Your Score Is ${score}`);
    window.location.replace('http://127.0.0.1:5000');
  } else {
    TimerValue--;
  }
}, 1000);


const HandleKeyBoard = (e) => {
  let Value = e.target.value;
  let input_boxes = document.querySelector(".input_boxes");

  if (Value == "ok") {
    
    answer = answer.trim().toLowerCase();
    let correctanswer = questions[randomNumber].a.trim().toLowerCase();
    correctanswer = correctanswer.replace(/ /g, "");
    
    console.log(answer);
    console.log(correctanswer);

    if (answer == correctanswer) {

      //reset timer
      clearInterval(TimeInterval);
      TimerValue = 0;

      TimerValue = 59;
      TimeInterval = setInterval(() => {
        Timer.textContent = TimerValue;
        if (TimerValue == 0) {
          clearInterval(TimeInterval);
          window.alert(`Game Over Your Score Is ${score}`);
          window.location.replace('http://127.0.0.1:5000');
        } else {
          TimerValue--;
        }
      }, 1000);

      score++;
      scoreVar.textContent = score;
      answer = "";
      input_boxes.innerHTML = "";
      randomNumber = Math.floor(Math.random() * 24);
      questionVar.textContent = questions[randomNumber].q;
      // TimerValue = 59;
    } else {
      window.alert(`Game Over Your Score Is ${score}`);
      window.location.replace('http://127.0.0.1:5000');
    //   score = 0;
    //   TimerValue=0
    //   scoreVar.textContent = "";
    //   answer = "";
    //   input_boxes.innerHTML = "";
    //   randomNumber = Math.floor(Math.random() * 24);
    //   questionVar.textContent = questions[randomNumber].q;
    }
  } else if (Value == "<") {
    console.log(answer);

    answer = answer.slice(0, -1);

    input_boxes.querySelector("input:last-child").remove();

    console.log(answer);
  } else {
    answer += Value;
    input_boxes.insertAdjacentHTML(
      "beforeend",
      `<input type="text" value=${Value} readonly maxlength="1" />`
    );
  }
};

key_board.forEach((EachKey) => {
  EachKey.addEventListener("click", HandleKeyBoard);
});

questionVar.textContent = questions[randomNumber].q;

function timeFunction() {}
window.addEventListener("load", (e) => {
  timeFunction();
});
