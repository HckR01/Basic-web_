// Get subject and topic from URL
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
const topic = urlParams.get("topic");

// Set topic title
document.getElementById("topicTitle").innerText = `Topic: ${topic}`;

// Example static questions (replace later with backend data)
const questions = [
  {
    text: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    correct: "4"
  },
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: "Paris"
  },
  {
    text: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: "Queue"
  }
];

// State
let currentQuestion = 0;
const answers = Array(questions.length).fill(null);
const marked = Array(questions.length).fill(false);

// DOM elements
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionGrid = document.getElementById("questionGrid");

function renderQuestion(index) {
  questionText.innerText = questions[index].text;
  optionsContainer.innerHTML = "";

  questions[index].options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      answers[index] = option;
      marked[index] = false; // Remove mark if answered
      renderGrid();
    };
    // Highlight selected option
    if (answers[index] === option) {
      btn.style.backgroundColor = "#b2ebf2";
    }
    optionsContainer.appendChild(btn);
  });

  renderGrid();
}

function renderGrid() {
  questionGrid.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const box = document.createElement("div");
    box.innerText = i + 1;

    if (i === currentQuestion) {
      box.style.backgroundColor = "#007bff"; // current - blue
      box.style.color = "white";
    } else if (marked[i]) {
      box.style.backgroundColor = "purple"; // marked for review
      box.style.color = "white";
    } else if (answers[i]) {
      box.style.backgroundColor = "green"; // answered
      box.style.color = "white";
    } else {
      box.style.backgroundColor = "red"; // not answered
      box.style.color = "white";
    }

    box.onclick = () => {
      currentQuestion = i;
      renderQuestion(currentQuestion);
    };
    questionGrid.appendChild(box);
  }
}

// Buttons
document.getElementById("markBtn").onclick = () => {
  marked[currentQuestion] = true;
  renderGrid();
};

document.getElementById("clearBtn").onclick = () => {
  answers[currentQuestion] = null;
  renderQuestion(currentQuestion);
};

document.getElementById("nextBtn").onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
};

// Timer (example: 10 min)
let time = 10 * 60;
const timerEl = document.getElementById("timer");

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerEl.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  if (time > 0) {
    time--;
    setTimeout(updateTimer, 1000);
  } else {
    alert("Time's up! Auto-submitting...");
    // Here you can submit answers
  }
}

updateTimer();
renderQuestion(currentQuestion);
