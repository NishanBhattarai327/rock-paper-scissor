const TOTAL_ROUND = 5;

const PLAYER_WON = 1;
const COMPUTER_WON = -1;
const DRAW = 0;

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
let gameOver = false;

/*for game over POPUP message*/
let popup = document.querySelector('.popup');
window.addEventListener('click', (event) => {
    if (event.target == popup) {
        hidePopup();
    }
});
let popupClose = document.querySelector('.popup-close');
popupClose.addEventListener('click', (e) => {
    hidePopup();
});

let popupGameOverMsg = document.querySelector('.game-over-message');
/*************/

function game(playerGuess) {
    if (!gameOver) {
        let round = playRound(playerGuess, randomGuess());
        if (roundCount < TOTAL_ROUND) {
            if (round.status === PLAYER_WON) {
                playerScore++;
            }
            else if (round.status === COMPUTER_WON) {
                computerScore++;
            }

            render(round.message, playerScore, computerScore, roundCount);
            roundCount++;
        }

        else {
            if (playerScore > computerScore) {
                render(round.message, playerScore, computerScore, roundCount);
            }
            else if (playerScore < computerScore) {
                render(round.message, playerScore, computerScore, roundCount);
            }
            else {
                render(round.message, playerScore, computerScore, roundCount);
            }
            gameOver = true;
        }
    }
    else {
        displayGameOverMsg();
    }
}

function playRound(playerGuess, computerGuess) {
    playerGuess = playerGuess.toLowerCase();

    changeStyleOf('computer', computerGuess);
    changeStyleOf('human', playerGuess);
    
    if (playerGuess !== "rock" && playerGuess !== "paper" && playerGuess !== "scissors") {
        return {message:"invalid input", status: 0};
    }

    if (playerGuess === computerGuess) {
        return {message:`Draw! ${computerGuess} and ${playerGuess} are same`, status: 0};
    }
    else if (playerGuess === "rock" && computerGuess === "scissors") {
        return {message:"You Win! rock beats scissors", status: PLAYER_WON};
    }
    else if (playerGuess === "paper" && computerGuess === "rock") {
        return {message:"You Win! paper beats rock", status: PLAYER_WON};
    }
    else if (playerGuess === "scissors" && computerGuess === "paper") {
        return {message:"You Win! scissors beats paper", status: PLAYER_WON};
    }
    else {
        return {message:`You Lose! ${computerGuess} beats ${playerGuess}`, status: COMPUTER_WON};
    }
}

function displayGameOverMsg() {
    let msg = 'Game Is Over <br><br>';
    if (playerScore > computerScore) {
        console.log('player');
        msg += `You Won! The Game by ${playerScore - computerScore} point`;
    }
    else if (playerScore < computerScore) {
        console.log('computer');
        msg += `Computer Won! The Game by ${computerScore - playerScore} point`;
    }
    else {
        console.log('tie');
        msg += "Tie Game";
    }

    showPopup();
    popupGameOverMsg.innerHTML = msg;
}

function resetGame() {
    gameOver = false;
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    render("Choose Weapon", 0, 0, 0);
    clearSelectedStyle('computer');
    clearSelectedStyle('human');
}

function render(msg, playerScore, computerScore, roundCount) {
    document.getElementById('message').innerHTML = msg;
    document.getElementById('human-score').innerHTML = playerScore;
    document.getElementById('computer-score').innerHTML = computerScore;
    document.getElementById('round-count').innerHTML = roundCount;
}

function randomGuess() {
    let choice = ['rock', 'paper', 'scissors'];
    return choice[Math.floor(Math.random() * 3)];
}

function clearSelectedStyle(parent) {
    let selectedStyle = document.querySelector(`.${parent}`).querySelectorAll('.selected');
    if (selectedStyle) {
        selectedStyle.forEach((elem) => {
            elem.classList.remove('selected');
        });
    }
}
function changeStyleOf(parent, guess) {
    clearSelectedStyle(parent);
    document.querySelector(`.${parent} .${guess}`).classList.add('selected');
}

function showPopup() {
    popup.style.display = 'block';
}
function hidePopup() {
    popup.style.display = 'none';
}
