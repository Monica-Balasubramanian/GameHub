let userScore = 0;
let compScore = 0;

function play(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const result = getResult(userChoice, computerChoice);

  if (result === "win") userScore++;
  else if (result === "lose") compScore++;

  document.getElementById("result").innerText =
    `You chose ${userChoice}, computer chose ${computerChoice}. You ${result}!`;

  document.getElementById("score").innerText =
    `You: ${userScore} | Computer: ${compScore}`;
}

function getResult(user, comp) {
  if (user === comp) return "draw";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) return "win";
  return "lose";
}

startGame();
