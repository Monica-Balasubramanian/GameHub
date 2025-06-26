let board = Array(9).fill(null);
let currentPlayer = "X";
let gameMode = ""; // 'player' or 'computer'
let isGameOver = false;

const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const boardElement = document.getElementById("board");
const modeSelect = document.getElementById("modeSelect");

function setMode(mode) {
  gameMode = mode;
  modeSelect.classList.add("hidden");
  boardElement.classList.remove("hidden");
  renderBoard();
}

function renderBoard() {
  cells.forEach((cell, index) => {
    cell.innerText = board[index] || "";
    cell.addEventListener("click", () => makeMove(index));
  });
}

function makeMove(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    result.innerText = `${winner} wins!`;
    isGameOver = true;
    return;
  }

  if (!board.includes(null)) {
    result.innerText = "It's a draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (gameMode === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyCells = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex);
}

function checkWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  result.innerText = "";
  renderBoard();
}

function setMode(mode) {
  gameMode = mode;
  document.getElementById("modeSelect").classList.add("hidden");
  document.getElementById("board").classList.remove("hidden");
  document.getElementById("restartContainer").classList.remove("hidden"); // SHOW the button
  renderBoard();
}
