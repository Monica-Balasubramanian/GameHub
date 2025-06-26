const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const emojis = ['🍎','🍌','🍇','🍓','🍊','🍉','🍍','🥝'];

function startGame() {
  board.innerHTML = "";
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  movesDisplay.textContent = "Moves: 0";

  // Duplicate and shuffle emojis
  const gameCards = shuffle([...emojis, ...emojis]);

  gameCards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });

  cards = document.querySelectorAll(".card");
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
  const card = this;
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.innerText = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedPairs++;
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    if (matchedPairs === emojis.length) {
      alert(`You won in ${moves} moves!`);
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerText = "";
    card2.innerText = "";
  }

  flippedCards = [];
}

startGame();
