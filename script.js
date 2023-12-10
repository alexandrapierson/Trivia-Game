/* 
  Welcome to Quiz Quake! Here's a little note about my original idea and how I 
  changed it slightly.

  I did not decide to go with a dice roll to determine the category of question. 
  Players can choose to avoid the inevitable as much as they want to. I personally 
  will always do history last, and if a player wishes to do the same, who am I to 
  stop them. 
*/

// Variable for the submit answer button
let validateAnswer = document.getElementById("validate-answer");
let addPlayer = document.getElementById("add-player");
let resetPlayers = document.getElementById("reset-players");

// Variables for the cateogry buttons
let setScience = document.getElementById("science");
let setHistory = document.getElementById("history");
let setGeography = document.getElementById("geography");
let setEntertainment = document.getElementById("entertainment");
let setSports = document.getElementById("sports");

// Variables for the difficulty buttons
let setEasy = document.getElementById("easy");
let setMedium = document.getElementById("medium");
let setHard = document.getElementById("hard");
let setInsane = document.getElementById("insane");

// Variables for the radio button's labels
let optionLabel1 = document.getElementById("first-answer");
let optionLabel2 = document.getElementById("second-answer");
let optionLabel3 = document.getElementById("third-answer");
let optionLabel4 = document.getElementById("fourth-answer");

// Variables for the radio buttons
let radioOption1 = document.getElementById("first-radio");
let radioOption2 = document.getElementById("second-radio");
let radioOption3 = document.getElementById("third-radio");
let radioOption4 = document.getElementById("fourth-radio");

// Variables of form inputs
let playerNameInput = document.getElementById("player-name");

// Variables of all HTML text variables
let playerQuantityLabel = document.getElementById("player-quantity-error");
let selectedQuestionLabel = document.getElementById("selected-question");
let winnerLabel = document.getElementById("winner");
let playerAnswerLabel = document.getElementById("display-player-answer");
let correctAnswerLabel = document.getElementById("display-correct-answer");
let currentPlayer = document.getElementById("current-player");

// CATEGORY AND DIFFICULTY SELECTIONS
let selectedCategory = null;
let selectedDifficulty = null;

let playerCount = 0;
let categories = ["Science", "History", "Geography", "Entertainment", "Sports"];
let pointsTable = document.getElementById("player-scores");

let turnCounter = 0;
let playerTurn = 1;

let getStoredTurn = JSON.parse(localStorage.getItem("playerTurn")) || 1;
let getTurnCount = JSON.parse(localStorage.getItem("turnCount")) || 0;
let existingData = JSON.parse(localStorage.getItem("playerData")) || [];

// Find all radio buttons with the name of "answer" and set them to the variable radioButtons
let radioButtons = document.querySelectorAll('input[name="answer"]');

playerTurn = getStoredTurn;
turnCounter = getTurnCount;

// Resets all stored data
resetPlayers.addEventListener("click", function () {
  localStorage.removeItem("playerData");
  localStorage.removeItem("playerTurn");
  localStorage.removeItem("turnCount");
  location.reload();
});

// Find player name
function findPlayer() {
  let player = existingData[playerTurn - 1].playerName;
  return player;
}

// Sets the Player Turn, based on number of players in the game
function playersTurn() {
  if (playerTurn == playerCount) {
    playerTurn = 1;
    localStorage.setItem("playerTurn", JSON.stringify(playerTurn));
  } else {
    playerTurn++;
    localStorage.setItem("playerTurn", JSON.stringify(playerTurn));
  }
}

function displayPlayer() {
  currentPlayer.textContent = "It is " + findPlayer() + "'s Turn";
}

addPlayer.addEventListener("click", function () {
  addPlayers();
});

// Disables all category buttons
function disableCategoryButtons() {
  let categoryButtons = document.querySelectorAll(
    "#science, #history, #geography, #entertainment, #sports"
  );
  categoryButtons.forEach(function (button) {
    button.disabled = true;
  });
}

// Enables all category buttons
function enableCategoryButtons() {
  let categoryButtons = document.querySelectorAll(
    "#science, #history, #geography, #entertainment, #sports"
  );
  categoryButtons.forEach(function (button) {
    button.disabled = false;
  });
}

// Disables all difficulty buttons
function disableDifficultyButtons() {
  let difficultyButtons = document.querySelectorAll(
    "#easy, #medium, #hard, #insane"
  );
  difficultyButtons.forEach(function (button) {
    button.disabled = true;
  });
}

// Enables all difficulty buttons
function enableDifficultyButtons() {
  let difficultyButtons = document.querySelectorAll(
    "#easy, #medium, #hard, #insane"
  );
  difficultyButtons.forEach(function (button) {
    button.disabled = false;
  });
}

function disableAnswerButton() {
  validateAnswer.disabled = true;
}

function enableAnswerButton() {
  validateAnswer.disabled = false;
}

function disableAddPlayerButton() {
  addPlayer.disabled = true;
}

function validateTurnCounter() {
  if (turnCounter > 0) {
    disableAddPlayerButton();
  }
}

function isPlayerThere() {
  if (existingData.length === 0) {
    disableCategoryButtons();
    disableDifficultyButtons();
    disableAnswerButton();
  } else {
    enableCategoryButtons();
    enableDifficultyButtons();
    disableAnswerButton();
  }
}

// ADD PLAYERS
function addPlayers() {
  if (playerCount < 4) {
    playerQuantityLabel.textContent = "";

    // Sets player name to the user input
    playerName = playerNameInput.value;

    if (playerName !== "") {
      // Sets the row count
      playerCount++;

      // Creates a row in the table
      let row = pointsTable.insertRow(-1);
      let player = row.insertCell(0);
      let scienceScore = row.insertCell(1);
      let historyScore = row.insertCell(2);
      let geographyScore = row.insertCell(3);
      let entertainmentScore = row.insertCell(4);
      let sportsScore = row.insertCell(5);

      // Sets the cell values in the row to the inputted player name and sets the point values to 0.
      player.innerHTML = playerName;
      scienceScore.innerHTML = 0;
      historyScore.innerHTML = 0;
      geographyScore.innerHTML = 0;
      entertainmentScore.innerHTML = 0;
      sportsScore.innerHTML = 0;

      // Add new player data to the existing array
      existingData.push({
        playerName: playerName,
        scienceScore: 0,
        historyScore: 0,
        geographyScore: 0,
        entertainmentScore: 0,
        sportsScore: 0,
      });

      // Store the updated player data back in local storage
      localStorage.setItem("playerData", JSON.stringify(existingData));

      isPlayerThere();
      displayPlayer();
    } else {
      playerQuantityLabel.textContent =
        "You must enter something in as a name!";
    }
  } else {
  }

  // Resets the Player Name input box to ""
  playerNameInput.value = "";
}

// Checks to see if the science category has been clicked
setScience.addEventListener("click", function () {
  selectedCategory = "science";
  disableCategoryButtons();
  displayQuestion();
});

// Checks to see if the history category has been clicked
setHistory.addEventListener("click", function () {
  selectedCategory = "history";
  disableCategoryButtons();
  displayQuestion();
});

// Checks to see if the geography category has been clicked
setGeography.addEventListener("click", function () {
  selectedCategory = "geography";
  disableCategoryButtons();
  displayQuestion();
});

// Checks to see if the entertainment category has been clicked
setEntertainment.addEventListener("click", function () {
  selectedCategory = "entertainment";
  disableCategoryButtons();
  displayQuestion();
});

// Checks to see if the sports category has been clicked
setSports.addEventListener("click", function () {
  selectedCategory = "sports";
  disableCategoryButtons();
  displayQuestion();
});

// Checks to see if the easy difficulty has been clicked
setEasy.addEventListener("click", function () {
  selectedDifficulty = "easy";
  disableDifficultyButtons();
  displayQuestion();
});

// Checks to see if the medium difficulty has been clicked
setMedium.addEventListener("click", function () {
  selectedDifficulty = "medium";
  disableDifficultyButtons();
  displayQuestion();
});

// Checks to see if the hard difficulty has been clicked
setHard.addEventListener("click", function () {
  selectedDifficulty = "hard";
  disableDifficultyButtons();
  displayQuestion();
});

// Checks to see if the insane difficulty has been clicked
setInsane.addEventListener("click", function () {
  selectedDifficulty = "insane";
  disableDifficultyButtons();
  displayQuestion();
});

// Creates a random number that can't be reused until all random numbers have been used.
function randomNumber(min, max, excludedNumbers) {
  // Creates an array of numbers from the min to the max, that populates itself.
  let availableNumbers = Array.from(
    { length: max - min + 1 },
    (_, i) => i + min
    // Excludes all numbers in the excluded numbers array from the available numbers array.
  ).filter((number) => !excludedNumbers.includes(number));

  if (availableNumbers.length === 0) {
    // All numbers have been selected, reset the excludedNumbers array
    excludedNumbers.length = 0;
    availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }

  // Finds an index position from the available numbers array.
  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  // Selects the number at the index position.
  const selectedNumber = availableNumbers[randomIndex];
  availableNumbers.splice(randomIndex, 1); // Remove the selected number from availableNumbers
  excludedNumbers.push(selectedNumber); // Adds the selected number to excluded numbers.

  return selectedNumber;
}

let selectedQuestion = null;

// SETTING THE TRIVIA QUESTION
function displayQuestion() {
  turnCounter++;
  localStorage.setItem("turnCount", JSON.stringify(turnCounter));

  validateTurnCounter();

  if (selectedCategory !== null && selectedDifficulty !== null) {
    enableAnswerButton();

    let excludedQuestions = [];

    displayPlayer();

    // Finds the number of questions in the selected categories difficulty.
    let questionIndex =
      triviaQuestions[selectedCategory][selectedDifficulty].length - 1;

    // Determines the question by a random number
    selectedQuestion = randomNumber(0, questionIndex, excludedQuestions);

    // Pulls a random question using the index
    let question =
      triviaQuestions[selectedCategory][selectedDifficulty][selectedQuestion]
        .question;
    // Pulls a random question's answers
    let allAnswers =
      triviaQuestions[selectedCategory][selectedDifficulty][selectedQuestion]
        .allAnswers;

    // Sets the question text content
    selectedQuestionLabel.textContent = question;

    // RANDOMIZES ANSWERS BEING DISPLAYED
    let number = null;
    let excludedAnswers = [];

    // Sets the first radio to an answer.
    number = randomNumber(0, 3, excludedAnswers);
    optionLabel1.textContent = allAnswers[number];
    radioOption1.value = allAnswers[number];

    // Sets the second radio to an answer.
    number = randomNumber(0, 3, excludedAnswers);
    optionLabel2.textContent = allAnswers[number];
    radioOption2.value = allAnswers[number];

    // Sets the third radio to an answer.
    number = randomNumber(0, 3, excludedAnswers);
    optionLabel3.textContent = allAnswers[number];
    radioOption3.value = allAnswers[number];

    // Sets the fourth radio to an answer.
    number = randomNumber(0, 3, excludedAnswers);
    optionLabel4.textContent = allAnswers[number];
    radioOption4.value = allAnswers[number];
  }
}

function updatePlayerScores(playerName, category, points) {
  findPlayer();

  switch (category) {
    case "science":
      categoryScore = "scienceScore";
      break;
    case "history":
      categoryScore = "historyScore";
      break;
    case "geography":
      categoryScore = "geographyScore";
      break;
    case "entertainment":
      categoryScore = "entertainmentScore";
      break;
    case "sports":
      categoryScore = "sportsScore";
      break;
    default:
      console.log("there was an error with changing category to categoryScore");
      break;
  }

  // Update the points for the specified category
  existingData[playerTurn - 1][categoryScore] = points;

  // Store the updated player data back in local storage
  localStorage.setItem("playerData", JSON.stringify(existingData));
}

function winCondition() {
  let winValue = 10;

  for (i = 0; i < existingData.length; i++) {
    // Gets the point value of every category for the player selected by the index of i
    let sciencePoints = existingData[i].scienceScore;
    let historyPoints = existingData[i].historyScore;
    let geographyPoints = existingData[i].geographyScore;
    let entertainmentPoints = existingData[i].entertainmentScore;
    let sportsPoints = existingData[i].sportsScore;

    // If all the point values of each category are over winValue, display a win message to the player
    if (
      sciencePoints >= winValue &&
      historyPoints >= winValue &&
      geographyPoints >= winValue &&
      entertainmentPoints >= winValue &&
      sportsPoints >= winValue
    ) {
      // Add find player and display player name

      winnerLabel.textContent = existingData[i].playerName + " Won!";

      disableCategoryButtons();
      disableDifficultyButtons();
      disableAddPlayerButton();
    }
  }
}

validateAnswer.addEventListener("click", function () {
  // Search triviaQuestions.js for the selected question to find the correct answer
  let correctAnswer =
    triviaQuestions[selectedCategory][selectedDifficulty][selectedQuestion]
      .correctAnswer;

  let selectedValue = null;

  // Loop through radio buttons to find the selected one
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      radioButton.checked = false;
      break; // Exit the loop once a selected radio button is found
    }
  }

  let point = null;
  let playerResult = null;

  // Check if the selected answer is correct and then give the player an assigned point value based on the difficulty of the question
  if (selectedValue === correctAnswer) {
    playerResult = true;
    switch (selectedDifficulty) {
      case "easy":
        point = 1;
        break;
      case "medium":
        point = 2;
        break;
      case "hard":
        point = 3;
        break;
      case "insane":
        point = 4;
        break;
      default:
        point = 0;
    }
  } else {
    // If the answer is wrong, set the point value to 0.
    playerResult = false;
    point = 0;
  }

  // Display the correct answer to the player.
  correctAnswerLabel.textContent =
    'The correct answer was "' + correctAnswer + '"';

  // Display if the answer was correct and the point value the player earned.
  if (playerResult === true) {
    playerAnswerLabel.textContent =
      "Congratulations! You got it correct and earned " + point + " points!";
  } else {
    playerAnswerLabel.textContent =
      "Seems like you got the question incorrect and didn't earn any points this round.";
  }

  // Determines the column based on the category of the question.
  let tableColumn = null;
  switch (selectedCategory) {
    case "science":
      tableColumn = 1;
      break;
    case "history":
      tableColumn = 2;
      break;
    case "geography":
      tableColumn = 3;
      break;
    case "entertainment":
      tableColumn = 4;
      break;
    case "sports":
      tableColumn = 5;
      break;
    default:
      playerAnswerLabel.textContent =
        "A category couldn't be found to give points to.";
  }

  // Uses the current player turn to determine where in the table to add points
  if (
    // Checks if the row/column of the cell exists
    pointsTable.rows.length > playerTurn &&
    pointsTable.rows[playerTurn].cells.length > tableColumn
  ) {
    // Gets the current cells value
    let currentPoints = parseInt(
      pointsTable.rows[playerTurn].cells[tableColumn].innerHTML,
      10
    );
    // Adds the current cells value to the calculated value of the question
    let totalPoints = currentPoints + point;
    // Sends the new value to the table
    pointsTable.rows[playerTurn].cells[tableColumn].innerHTML = totalPoints;

    updatePlayerScores(findPlayer(), selectedCategory, totalPoints);
  } else {
    console.error("Invalid row or column index");
  }

  // Determines who's turn it is
  playersTurn();
  displayPlayer();

  // Enable the Category and Difficulty Buttons
  enableCategoryButtons();
  enableDifficultyButtons();
  disableAnswerButton();

  // Reset selectedCategory and selectedDifficulty
  selectedCategory = null;
  selectedDifficulty = null;

  winCondition();
});

// Function to load and display stored player data on page load
function loadPlayerData() {
  // Get existing player data from local storage
  let existingData = JSON.parse(localStorage.getItem("playerData")) || [];

  console.log(turnCounter);

  isPlayerThere();

  validateTurnCounter();

  // Loop through the existing data and update the table
  existingData.forEach(function (playerData) {
    if (playerCount < 4) {
      // Sets the row count
      playerCount++;

      // Sets player name to the stored data
      playerName = playerData.playerName;

      // Creates a row in the table
      let row = pointsTable.insertRow(-1);
      let player = row.insertCell(0);
      let scienceScore = row.insertCell(1);
      let historyScore = row.insertCell(2);
      let geographyScore = row.insertCell(3);
      let entertainmentScore = row.insertCell(4);
      let sportsScore = row.insertCell(5);

      // Sets the cell values in the row to the stored player data
      player.innerHTML = playerName;
      scienceScore.innerHTML = playerData.scienceScore || 0;
      historyScore.innerHTML = playerData.historyScore || 0;
      geographyScore.innerHTML = playerData.geographyScore || 0;
      entertainmentScore.innerHTML = playerData.entertainmentScore || 0;
      sportsScore.innerHTML = playerData.sportsScore || 0;
    }

    displayPlayer();
  });

  winCondition();
}

// Call the function on page load
window.addEventListener("load", loadPlayerData);
