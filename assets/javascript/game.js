// Declare variables
var answers, currentCategory, currentWord, availableLetters, guessedLetters, numLettersMatched, numFailedGuesses;

// Declare persistent DOM variables
var categoryElement, lettersElement, guessedLettersElement, guessTextbox, errorText, infoText, winText, loseText, restartButton, guessButton;

// Start a new game & Initialize variables
function setUpGame() {
    initializeVariables();
    handleDOMItems();
}

// Reset any global variables back to their starting states for each game
function initializeVariables() {
    answers = [
        { category: 'Month', word: 'AUGUST' },
        { category: 'State', word: 'WYOMING' },
        { category: 'Country', word: 'NORWAY' },
        { category: 'On the map', word: 'ANTARCTICA' },
        { category: 'Fictional Place', word: 'METROPOLIS' },
        { category: 'Food and Drink', word: 'RAVIOLI' },
        { category: 'Fictional Character', word: 'DRACULA' },
        { category: 'Around the house', word: 'BOOKSHELF' },
        { category: 'Occupation', word: 'ANTHROPOLOGIST' },
        { category: 'Movie Title', word: 'GHOSTBUSTERS' }
    ];

    var index = Math.floor(Math.random() * answers.length);
    currentCategory = answers[index].category;
    currentWord = answers[index].word;

    availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    guessedLetters = '';

    numLettersMatched = 0;
    numFailedGuesses = 0;
}

// Capture any required elements, and add JS content to the DOM
function handleDOMItems() {
    // capture DOM elements
    categoryElement = document.getElementById('category');
    lettersElement = document.getElementById('letters');
    guessedLettersElement = document.getElementById('guessed-letters');
    guessTextbox = document.getElementById('txt-guess');
    errorText = document.getElementById('error');
    infoText = document.getElementById('info');
    winText = document.getElementById('win');
    loseText = document.getElementById('lose');
    restartButton = document.getElementById('btn-new');
    guessButton = document.getElementById('btn-guess');
    maga = document.getElementById('wrong');

    // add category to DOM
    categoryElement.insertAdjacentHTML('beforeend', currentCategory)

    // add individual letters in current word to DOM, one by one
    for (let i = 0; i < currentWord.length; i++) {
        var currentLetter = currentWord.charAt(i).toUpperCase();
        var letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.classList.add('letter' + currentLetter);
        letterElement.innerText = currentLetter;
        lettersElement.appendChild(letterElement);
    }
}

//  Handle guess button-click. Validate & track guesses, and check game-over status
function submitGuess() {

    // Capture and store the user's guess
    var guess = guessTextbox.value.toUpperCase();
    guessTextbox.value = '';
    guessTextbox.focus();

    // If user's guess is invalid, display errors and stop executing
    if (!isValid(guess)) return;

    handleGuess(guess);
    checkForEndOfGame();
}

// Return a value based on whether the guess is valid input.

function isValid(guess) {
    var errorCount = 0;

    // Clear warning text
    errorText.style.display = 'none';
    infoText.style.display = 'none';

    // If input is not an allowed character
    if (guess == '' || availableLetters.indexOf(guess) == -1) {
        errorText.style.display = 'block';
        errorCount++;
    }

    // If input has already been guessed
    else if (guessedLetters.indexOf(guess) > -1) {
        infoText.style.display = 'block';
        errorCount++;
    }

    if (errorCount > 0) return false;
    else return true;
}


// Process the user's input, and update the DOM accordingly
function handleGuess(guess) {

    // Add current guess to guessedLetters collection
    guessedLetters += guess;
    maga.style.display = 'none';
    // Create guess element to add later to DOM
    var guessElement = document.createElement('div');
    guessElement.classList.add('guess');
    guessElement.innerText = guess;

    // If correct guess
    if (currentWord.indexOf(guess) > -1) {
        var lettersToShow = document.querySelectorAll('[class$="letter' + guess + '"]');
        for (let i = 0; i < lettersToShow.length; i++) {
            lettersToShow[i].classList.add('correct-letter');
            numLettersMatched += 1;
        }

        guessElement.classList.add('correct-guess');
    }

    // If incorrect guess
    else {
        fillAttemptBox();
        numFailedGuesses += 1;
        guessElement.classList.add('incorrect-guess');
        maga.style.display = 'none';

    }

    // Add guess element to DOM
    guessedLettersElement.appendChild(guessElement);
}

// Search for first empty box, and fill it with red 

function fillAttemptBox() {
    var box = document.querySelector('[class$="box"]');
    if (box)
        box.classList.add('whiteBalls');
}

// Check to see if user has completed the game. Update the DOM with win/lose text accordingly. 

function checkForEndOfGame() {
    var gameOver = false;

    //Win
    if (numLettersMatched == currentWord.length) {
        gameOver = true;
        winText.style.display = 'block';
    }

    //Lose
    else if (numFailedGuesses == 6) {
        gameOver = true;
        loseText.style.display = 'block';
    }

    if (gameOver) {
        restartButton.style.display = 'block';
        maga.style.display = 'none';
        guessButton.disabled = true;
        guessTextbox.disabled = true;
    }
}

// Reset the DOM to the default state, and re-run original game set up 

function startNewGame() {
    // Clear existing game data from DOM
    categoryElement.innerHTML = '';
    categoryElement.innerHTML = '';
    lettersElement.innerHTML = '';
    guessedLettersElement.innerHTML = '&nbsp; ';

    // Clear attempts from boxes
    var boxes = document.querySelectorAll('[class^="box"]');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('whiteBalls');
    }

    // Hide win/lose text & restart button
    winText.style.display = 'none';
    loseText.style.display = 'none';
    restartButton.style.display = 'none';

    // Re-enable "guess" button & textbox
    guessButton.disabled = false;
    guessTextbox.disabled = false;

    // Restart game
    setUpGame();
}

setUpGame();