const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let words = [];
//list of words
async function getWords() {
  const response = await fetch(
    `https://random-word-api.herokuapp.com//word?number=40`
  );
  const data = await response.json();
  data.forEach(function (word) {
    words.push(word);
  });
  addWordToDOM();
  return data;
}

getWords();

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//difficulty value in local storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//focus on text input on start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//update score
function updateScore() {
  console.log(score);
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //end game

    gameOver();
  }
}

//game over function, show end screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Play Again</button>
  `;

  endgameEl.style.display = "flex";
}

//Event listener/ listen for input
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear input
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});
//settings btn click
settingsBtn.addEventListener("click", function () {
  settings.classList.toggle("hide");
});

// settings select
settingsForm.addEventListener("change", function (e) {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
