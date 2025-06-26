let score = 0;
let currentMole = null;
let moleTimer;

function startGame() {
  score = 0;
  document.getElementById("score").textContent = `Score: ${score}`;
  generateGrid();
  spawnMole();
}

function generateGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.index = i;
    square.onclick = () => {
      if (parseInt(square.dataset.index) === currentMole) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        square.innerHTML = "";
        currentMole = null;
      }
    };
    grid.appendChild(square);
  }
}

function spawnMole() {
  clearInterval(moleTimer);
  moleTimer = setInterval(() => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(sq => (sq.innerHTML = ""));
    const randomIndex = Math.floor(Math.random() * 9);
    const mole = document.createElement("div");
    mole.classList.add("mole");
    squares[randomIndex].appendChild(mole);
    currentMole = randomIndex;
  }, 1000);
}

startGame();
