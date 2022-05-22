import { questions } from "./questions.js";

const key_board = document.querySelectorAll(".key_board input");
const questionVar = document.querySelector(".question");
const scoreVar = document.querySelector(".score span");
let score = 0;
let TimerValue = 59;
let answer = "";

const HandleKeyBoard = (e) => {
  let Value = e.target.value;
  let input_boxes = document.querySelector(".input_boxes");

  if (Value == "ok") {
    answer = answer.trim().toLowerCase();
    let correctanswer = questions[score].a.trim().toLowerCase();

    correctanswer = correctanswer.replace(/ /g, "");
    console.log(answer);
    console.log(correctanswer);
    if (answer == correctanswer) {
      score++;
      scoreVar.textContent = score;
      answer = "";
      input_boxes.innerHTML = "";
      questionVar.textContent = questions[score].q;
      TimerValue = 59;
    } else {
      window.alert(`Game Over Your Score Is ${score}`);
      score = 0;
      scoreVar.textContent = "";
      answer = "";
      input_boxes.innerHTML = "";
      questionVar.textContent = questions[score].q;
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

questionVar.textContent = questions[score].q;

function timeFunction() {
  let Timer = document.querySelector(".time");

  let TimeIneteval = setInterval(() => {
    Timer.textContent = TimerValue;
    if (TimerValue == 0) {
      TimerValue = 0;
    } else {
      TimerValue--;
    }
  }, 1000);
}
window.addEventListener("load", (e) => {
  timeFunction();
});
