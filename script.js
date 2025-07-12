let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let twoPlayerBtn = document.querySelector("#two-player-btn");
let aiBtn = document.querySelector("#ai-btn");

let turnO = true; 
let count = 0;
let isVsAI = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const setMode = (aiMode) => {
  isVsAI = aiMode;
  resetGame();
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else if (!isVsAI) {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    if (checkWinner()) return;
    if (count === 9) return gameDraw();

    if (isVsAI && !turnO) {
      setTimeout(aiMove, 400);
    }
  });
});

const aiMove = () => {
  // Simple AI: first empty box
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerText === "") {
      boxes[i].innerText = "X";
      boxes[i].disabled = true;
      count++;
      turnO = true;
      break;
    }
  }

  checkWinner();
  if (count === 9) gameDraw();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return true;
    }
  }
  return false;
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
twoPlayerBtn.addEventListener("click", () => setMode(false));
aiBtn.addEventListener("click", () => setMode(true));