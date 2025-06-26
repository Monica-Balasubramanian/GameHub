  const wordSets = {
    Animals: [
  "elephant", "giraffe", "tiger", "monkey", "dolphin",
  "kangaroo", "zebra", "cheetah", "panda", "rhinoceros",
  "hippopotamus", "leopard", "camel", "chimpanzee", "otter"
],

    Fruits: [
  "banana", "apple", "cherry", "orange", "mango",
  "pineapple", "blueberry", "grapefruit", "watermelon", "kiwi",
  "strawberry", "peach", "papaya", "plum", "pomegranate"
],
Countries: [
  "india", "canada", "brazil", "france", "germany",
  "japan", "australia", "egypt", "italy", "mexico",
  "norway", "russia", "thailand", "vietnam", "nigeria"
],
    Movies: [
  "avatar", "inception", "titanic", "joker", "gladiator",
  "interstellar", "coco", "frozen", "avengers", "batman",
  "spiderman", "tenet", "dangal", "bahubali", "aladdin"
]};

  let selectedWord = "";
  let guessedLetters = [];
  let lives = 6;
  let category = "";

  function getRandomCategory() {
    const keys = Object.keys(wordSets);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function startGame() {
    category = getRandomCategory();
    const words = wordSets[category];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    lives = 6;
    document.getElementById("categoryName").textContent = category;
    document.getElementById("livesCount").textContent = lives;
    updateDisplay();
    renderLetters();
  }

  function updateDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.textContent = selectedWord
      .split("")
      .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  }

  function renderLetters() {
    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const char = String.fromCharCode(i).toLowerCase();
      const btn = document.createElement("button");
      btn.textContent = char;
      btn.className = "letter-btn";
      btn.disabled = guessedLetters.includes(char);
      btn.onclick = () => handleGuess(char, btn);
      lettersDiv.appendChild(btn);
    }
  }

  function handleGuess(letter, btn) {
    guessedLetters.push(letter);
    btn.disabled = true;
    if (!selectedWord.includes(letter)) {
      lives--;
      document.getElementById("livesCount").textContent = lives;
    }
    updateDisplay();
    checkGameOver();
  }

  function checkGameOver() {
    if (lives <= 0) {
      alert("Game Over! The word was: " + selectedWord);
      startGame();
    } else if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
      alert("🎉 You guessed it!");
      startGame();
    }
  }

  window.onload = startGame;
