const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("high-score").textContent = `High Score: ${highScore}`;

document.getElementById("start").addEventListener("click", () => {
  if (!started) {
    level = 0;
    score = 0;
    gamePattern = [];
    started = true;
    nextSequence();
    document.getElementById("score").textContent = `Score: ${score}`;
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  score += 10;

  document.getElementById("level-title").textContent = "Level " + level;
  document.getElementById("score").textContent = `Score: ${score}`;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById("high-score").textContent = `High Score: ${highScore}`;
  }

  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  setTimeout(() => {
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
  }, 500);
}

function playSound(name) {
  const sounds = {
    red: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    blue: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    green: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    wrong: "https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav"
  };
  const audio = new Audio(sounds[name] || sounds.wrong);
  audio.play();
}

function animatePress(color) {
  const activeButton = document.getElementById(color);
  activeButton.classList.add("pressed");
  setTimeout(() => activeButton.classList.remove("pressed"), 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over! Press Start";
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
