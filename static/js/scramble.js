const words = [
  { word: "planet", hint: "A celestial body that orbits a star" },
  { word: "computer", hint: "Used to perform tasks and calculations" },
  { word: "javascript", hint: "Popular web scripting language" },
  { word: "keyboard", hint: "Used to type on a computer" },
  { word: "python", hint: "Popular programming language named after a snake" },
  { word: "library", hint: "A place full of books" },
  { word: "internet", hint: "Global network of computers" },
  { word: "language", hint: "A system of communication" },
  { word: "calendar", hint: "Used to track dates" },
  { word: "biology", hint: "The study of living things" },
  { word: "science", hint: "Systematic study of the structure and behavior of the world" },
  { word: "gravity", hint: "Force that pulls objects toward Earth" },
  { word: "engineer", hint: "Someone who designs and builds machines or structures" },
  { word: "oxygen", hint: "Essential gas we breathe" },
  { word: "formula", hint: "Used in math and science for calculation" },
  { word: "browser", hint: "Used to surf the internet" },
  { word: "monitor", hint: "Output device for displaying information" },
  { word: "battery", hint: "Powers electronic devices" },
  { word: "satellite", hint: "Orbits Earth to transmit data" },
  { word: "pencil", hint: "Used for writing or drawing" },
  { word: "teacher", hint: "Educates students" },
  { word: "student", hint: "Learns from a teacher" },
  { word: "college", hint: "Place of higher education" },
  { word: "subject", hint: "A topic studied in school" },
  { word: "project", hint: "Assignment or task in school" },
  { word: "network", hint: "Connected system of computers" },
  { word: "database", hint: "Organized collection of data" },
  { word: "biology", hint: "Study of life" },
  { word: "history", hint: "Study of past events" },
  { word: "physics", hint: "Science of matter and energy" },
  { word: "robotics", hint: "Study and design of robots" },
  { word: "machine", hint: "A tool with moving parts" },
  { word: "coding", hint: "Writing instructions for computers" },
  { word: "editor", hint: "Software used to write code" },
  { word: "server", hint: "Provides data to other computers" }

];

let currentWord = "";
let scrambled = "";
let timer;
let timeLeft = 30;
let score = 0;

function scramble(word) {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
}

function startGame() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("time").textContent = timeLeft;
  const random = words[Math.floor(Math.random() * words.length)];
  currentWord = random.word.toLowerCase();
  scrambled = scramble(currentWord);
  document.getElementById("scrambled").textContent = scrambled;
  document.getElementById("hint").textContent = "Hint: " + random.hint;
  document.getElementById("userInput").value = "";
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert("⛔ Time's up! The word was: " + currentWord);
      startGame();
    }
  }, 1000);
}

function checkWord() {
  const input = document.getElementById("userInput").value.toLowerCase();
  if (input === currentWord) {
    clearInterval(timer);
    alert("🎉 Correct!");
    score++;
    document.getElementById("points").textContent = score;
    startGame();
  } else {
    alert("❌ Wrong! Try again.");
  }
}

window.onload = startGame;
