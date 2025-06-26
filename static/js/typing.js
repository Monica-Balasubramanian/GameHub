const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a great skill to master early.",
  "JavaScript makes websites interactive and fun.",
  "Practice every day to improve your speed.",
  "Flask is a micro web framework in Python.",
  "Coding helps solve real world problems.",
  "Learning to type fast is a useful skill.",
  "Python is loved for its simplicity and readability.",
  "Debugging is twice as hard as writing the code.",
  "Every expert was once a beginner."
];

let selectedSentences = [];
let currentIndex = 0;
let startTime;
let timings = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadSentence() {
  if (currentIndex >= selectedSentences.length) {
    showResults();
    return;
  }

  const sentence = selectedSentences[currentIndex];
  document.getElementById("sentence").textContent = sentence;
  document.getElementById("inputBox").value = "";
  document.getElementById("result").textContent = `Typing ${currentIndex + 1} of ${selectedSentences.length}`;
  startTime = new Date().getTime();
}

function startTest() {
  shuffle(sentences);
  selectedSentences = sentences.slice(0, 5);
  currentIndex = 0;
  timings = [];
  loadSentence();
}

function handleNext() {
  const typed = document.getElementById("inputBox").value.trim();
  const target = selectedSentences[currentIndex];
  
  if (typed !== target) {
    alert("Please type the exact sentence before proceeding.");
    return;
  }

  const endTime = new Date().getTime();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  timings.push({ sentence: target, time: timeTaken });

  currentIndex++;
  loadSentence();
}

function showResults() {
  const resultDiv = document.getElementById("result");
  let total = 0;
  let details = `<h3>Typing Results:</h3><ul>`;
  timings.forEach((entry, idx) => {
    details += `<li>Sentence ${idx + 1}: ${entry.time} sec</li>`;
    total += parseFloat(entry.time);
  });
  details += `</ul><strong>Total Time:</strong> ${total.toFixed(2)} sec<br>`;
  const avgSpeed = (selectedSentences.join(" ").split(" ").length / total) * 60;
  details += `<strong>Avg Speed:</strong> ${Math.round(avgSpeed)} WPM`;
  resultDiv.innerHTML = details;

  document.getElementById("sentence").textContent = "🎉 Test Complete!";
  document.getElementById("inputBox").value = "";
}

startTest();
