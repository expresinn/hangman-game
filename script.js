const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


let currentWord, correctLetters, wrongGuessesCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessesCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessesCount}.png`;
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () =>{
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    const letter = clickedLetter.toUpperCase();

    if(currentWord.includes(letter)) {
        [...currentWord].forEach((char, index) => {
            if(char === letter) {
                correctLetters.push(char)
                wordDisplay.querySelectorAll("li")[index].innerText = char;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessesCount++;
        hangmanImage.src = `images/hangman-${wrongGuessesCount}.png`;

    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`;

    if(wrongGuessesCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

for(let i=65; i<=90; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);