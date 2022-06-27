// Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Function to add placeholders for each letter
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }

  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// Event listener for button
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // empty message paragraph
  message.innerText = "";
  // Get what was entered in the input
  const guess = letterInput.value;
  // console.log(guess);
  // Check if input is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

// Function to check player's input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.input === 0) {
    // if input is empty
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // if imput is more than one letter
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // if input is number or symblol
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    // If input is a single letter
    return input;
  }
};

// function to capture input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// function to show the guessed letters
const showGuessedLetters = function () {
  // Clear list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
