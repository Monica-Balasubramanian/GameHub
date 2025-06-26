const boardSize = 4;
let board = [];
let score = 0;

function startGame() {
  board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
  score = 0;
  addRandomTile();
  addRandomTile();
  updateBoard();
}

function addRandomTile() {
  const emptyCells = [];
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell === 0) emptyCells.push([i, j]);
    })
  );
  if (emptyCells.length === 0) return;
  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[x][y] = Math.random() < 0.9 ? 2 : 4;
}

function updateBoard() {
  const boardDiv = document.getElementById("game-board");
  boardDiv.innerHTML = "";
  board.forEach(row =>
    row.forEach(cell => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = cell !== 0 ? cell : "";
      tile.style.backgroundColor = getTileColor(cell);
      boardDiv.appendChild(tile);
    })
  );
  document.getElementById("score").textContent = `Score: ${score}`;
}

function getTileColor(value) {
 const colors = {
    0: "#eee4da",        
    2: "#e0f7fa",        
    4: "#b2ebf2",        
    8: "#80deea",        
    16: "#4dd0e1",       
    32: "#00bcd4",       
    64: "#00acc1",       
    128: "#7c4dff",      
    256: "#651fff",      
    512: "#6200ea",      
    1024: "#ff4081",     
    2048: "#f50057",     
    4096: "#d50000",     
    8192: "#c51162"      
  };
  return colors[value] || "#000"; 
}

function move(dir) {
  let moved = false;
  const rotate = (b, times) => {
    for (let t = 0; t < times; t++) {
      b = b[0].map((_, i) => b.map(row => row[i]).reverse());
    }
    return b;
  };

  let tempBoard = board.map(row => row.slice());

  // Normalize direction (left only)
  if (dir === "up") tempBoard = rotate(tempBoard, 1);
  else if (dir === "right") tempBoard = rotate(tempBoard, 2);
  else if (dir === "down") tempBoard = rotate(tempBoard, 3);

  for (let i = 0; i < boardSize; i++) {
    let row = tempBoard[i].filter(val => val !== 0);
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2;
        score += row[j];
        row[j + 1] = 0;
        moved = true;
      }
    }
    row = row.filter(val => val !== 0);
    while (row.length < boardSize) row.push(0);
    if (!moved && row.toString() !== tempBoard[i].toString()) moved = true;
    tempBoard[i] = row;
  }

  // Rotate back
  if (dir === "up") tempBoard = rotate(tempBoard, 3);
  else if (dir === "right") tempBoard = rotate(tempBoard, 2);
  else if (dir === "down") tempBoard = rotate(tempBoard, 1);

  if (moved) {
    board = tempBoard;
    addRandomTile();
    updateBoard();
  }
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft":
      move("left");
      break;
    case "ArrowRight":
      move("right");
      break;
    case "ArrowUp":
      move("up");
      break;
    case "ArrowDown":
      move("down");
      break;
  }
});

startGame();
