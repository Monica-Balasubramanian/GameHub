let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const input = document.getElementById("guessInput");
  const guess = Number(input.value);
  const feedback = document.getElementById("feedback");
  const attemptDisplay = document.getElementById("attempts");

  if (!guess || guess < 1 || guess > 100) {
    feedback.innerText = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts++;
  attemptDisplay.innerText = attempts;

  if (guess === secretNumber) {
    feedback.innerText = `🎉 Correct! The number was ${secretNumber}.`;
  } else if (guess < secretNumber) {
    feedback.innerText = "📉 Too low! Try again.";
  } else {
    feedback.innerText = "📈 Too high! Try again.";
  }

  input.value = "";
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("attempts").innerText = "0";
  document.getElementById("feedback").innerText = "";
  document.getElementById("guessInput").value = "";
}
