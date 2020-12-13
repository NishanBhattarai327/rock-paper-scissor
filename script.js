const TOTAL_ROUND = 5;

const PLAYER_WON = 1;
const COMPUTER_WON = -1;
const DRAW = 0;

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;


function game(playerGuess) {
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
            render("You won the Game <br>" + round.message, playerScore, computerScore, roundCount);
        }
        else if (playerScore < computerScore) {
            render("Computer won the Game <br>" + round.message, playerScore, computerScore, roundCount);
        }
        else {
            render("Draw Game <br>" + round.message, playerScore, computerScore, roundCount);
        }
    }
}

function playRound(playerGuess, computerGuess) {
    playerGuess = playerGuess.toLowerCase();

    clearPreviousStyleOf("computer");
    clearPreviousStyleOf("human");

    changeStyleOf("computer", computerGuess);
    changeStyleOf("human", playerGuess);
    
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

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    render("", 0, 0, 0);
    clearPreviousStyleOf('human');
    clearPreviousStyleOf('computer');
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

function clearPreviousStyleOf(parentClass) {
    document.querySelector("." + parentClass).querySelectorAll(":scope .choice").forEach((element) => {
        element.style.background = "#fff";
    });
}
function changeStyleOf(parentClass, selfClass) {
    document.querySelector("." + parentClass +" ." + selfClass).style.background = "#efefef";
}

