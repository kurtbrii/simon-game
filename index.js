// !VARIABLE DECLARATION
let gamePattern = [];
let counter = 0;
const allColors = ["red", "blue", "green", "yellow"];
let level = 0;
let inGame = false;
let canUserClick = false;

//  ==================================================================================

// ! MAIN FUNCTIONS
// start the game
$(document).on("keypress", function () {
  if (!inGame) {
    newSequence();
    inGame = true;
  }
});

// ! player input
$("button").on("click", function () {
  playAudio(this.id); // i.e., "yellow"
  buttonAnimation(this);

  if (gamePattern[counter] == this.id) {
    counter++;

    // checks if all tiles are already pressed and user hasn't made a mistake
    if (counter === gamePattern.length) {
      setTimeout(() => {
        level++;
        counter = 0;
        newSequence();
      }, 500); // gap of 500 ms in going to the next level
    }
  } else gameOver();
});

//  ==================================================================================

// ! FUNCTION DEFINITIONS
function newSequence() {
  $("h1").text(`level ${level + 1}`);

  let randomColor = generateRandomColor(allColors);
  gamePattern.push(randomColor);

  let patternCounter = 0;
  const limit = gamePattern.length;

  setInterval(() => {
    if (patternCounter !== limit) {
      // play all patterns
      buttonAnimation(`#${gamePattern[patternCounter]}`);
      playAudio(gamePattern[patternCounter]);
      patternCounter++;
    }
  }, 500); // gap in "loop"
}

function generateRandomColor(randomColors) {
  var index = Math.floor(Math.random() * randomColors.length);
  return randomColors[index];
}

function buttonAnimation(id) {
  $(id).fadeOut(300).fadeIn(100);
}

function playAudio(id) {
  var audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
}

function gameOver() {
  // basically resets everything
  counter = 0;
  inGame = false;
  gamePattern = [];
  level = 0;
  $("h1").html("Try Again!<br/>(Press any Key to Start)");
}
