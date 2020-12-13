const TOTAL_ROUND = 5;

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;


function game(playerGuess) {
    if (roundCount < TOTAL_ROUND) {
        let round = playRound(playerGuess, randomGuess());
        if (round.point === 1) {
            playerScore++;
        }
        else if (round.point === -1) {
            computerScore++;
        }

        display(round.message, playerScore, computerScore, roundCount);
        roundCount++;
    }

    else {
        if (playerScore > computerScore) {
            display("You won the Game", playerScore, computerScore, roundCount);
        }
        else if (playerScore < computerScore) {
            display("Computer won the Game", playerScore, computerScore, roundCount);
        }
        else {
            display("Draw Game", playerScore, computerScore, roundCount);
        }
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    display("", 0, 0, 0);
    clearPreviousStyleOf('human');
    clearPreviousStyleOf('computer');
}

function randomGuess() {
    let choice = ['rock', 'paper', 'scissors'];
    return choice[Math.floor(Math.random() * 3)];
}


function playRound(playerGuess, computerGuess) {
    playerGuess = playerGuess.toLowerCase();

    clearPreviousStyleOf("computer");
    clearPreviousStyleOf("human");

    changeStyleOf("computer", computerGuess);
    changeStyleOf("human", playerGuess);
    
    if (playerGuess !== "rock" && playerGuess !== "paper" && playerGuess !== "scissors") {
        return {message:"invalid input", point: 0};
    }

    if (playerGuess === computerGuess) {
        return {message:`Draw! ${computerGuess} and ${playerGuess} are same`, point: 0};
    }
    else if (playerGuess === "rock" && computerGuess === "scissors") {
        return {message:"You Win! rock beats scissors", point: 1};
    }
    else if (playerGuess === "paper" && computerGuess === "rock") {
        return {message:"You Win! paper beats rock", point: 1};
    }
    else if (playerGuess === "scissors" && computerGuess === "paper") {
        return {message:"You Win! scissors beats paper", point: 1};
    }
    else {
        return {message:`You Lose! ${computerGuess} beats ${playerGuess}`, point: -1};
    }
}

function display(msg, playerScore, computerScore, roundCount) {
    document.getElementById('message').innerHTML = msg;
    document.getElementById('human-score').innerHTML = playerScore;
    document.getElementById('computer-score').innerHTML = computerScore;
    document.getElementById('round-count').innerHTML = roundCount;
}

function clearPreviousStyleOf(parentClass) {
    document.querySelector("." + parentClass).querySelectorAll(":scope .choice").forEach((element) => {
        element.style.background = "#fff";
    });
}
function changeStyleOf(parentClass, selfClass) {
    document.querySelector("." + parentClass +" ." + selfClass).style.background = "#efefef";
}

