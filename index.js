const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let cellValues = Array(9).fill("");

const cells = document.getElementsByClassName("tic-tac-toe-cell");
const finishedMsg = document.getElementById("finished-message");
// const gameOverMsg = document.getElementById("game-over-message");
// const gameDrawMsg = document.getElementById("game-draw-message");
const restartButton = document.getElementById("res-button");

let playerXTurn = true;
let hasWon = false;

const checkWin = () => {
  const symbol = playerXTurn ? "X" : "O";

  const indexes = cellValues
    .map((value, index) => {
      return value === symbol ? index : -1;
    })
    .filter((index) => index > -1);

  winPatterns.forEach((pattern) => {
    if (
      pattern.every((index) => {
        return indexes.includes(index);
      })
    ) {
      hasWon = true;
    }
  });
  return hasWon;
};

const onClickCell = (index) => {
  if (hasWon) return;
  const cell = cells[index];
  if (cell.innerHTML !== "") return;
  cell.innerHTML = cellValues[index] = playerXTurn ? "X" : "O";
  if (checkWin()) {
    finishedMsg.innerHTML = playerXTurn ? "Player X won" : "Player O won";
    restartButton.style.visibility = "visible";
  } else {
    finishedMsg.innerHTML = playerXTurn ? "Player O's turn" : "Player X's turn";
  }
  playerXTurn = !playerXTurn;
};

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => {
    onClickCell(i);
    gameDraw();
  });
}

//--------------------------
//game draw code starts here
//--------------------------
const gameDraw = () => {
  if (
    cellValues.every((item) => {
      return item !== "";
    }) &&
    !hasWon
  ) {
    finishedMsg.innerHTML = "Draw";
    restartButton.style.visibility = "visible";
  }
};

//--------------------------
//game draw code ends here
//--------------------------

const resetGameState = () => {
  cellValues.fill("");
  hasWon = false;
  playerXTurn = true;
  finishedMsg.innerHTML = "";
  restartButton.style.visibility = "hidden";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
};
restartButton.addEventListener("click", resetGameState);
