function getComputerChoice() {
  const computer = Math.floor(Math.random() * 3);
  if (computer === 0) return "rock";
  if (computer === 1) return "scissors";
  return "paper";
}

function getHumanChoice() {
  return prompt("Enter rock paper or scissors").trim().toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "tie";
  }
  if (
    (humanChoice === "rock" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "rock")
  ) {
    return "computer";
  }
  return "human";
}
let humanScore = 0;
let computerScore = 0;

function playGame() {
  for (let i = 1; i <= 5; i++) {
    let humanSelection = getHumanChoice();
    let computerSelection = getComputerChoice();
    let round = playRound(humanSelection, computerSelection);

    if (round === "tie") {
      console.log(
        `you picked(${humanSelection}) and computer picked (${computerSelection}) its a tie game`,
      );
      showScore();
    }
    if (round === "computer") {
      console.log(
        `you picked (${humanSelection}) and computer picked (${computerSelection}) computer wins`,
      );
      computerScore++;
      showScore();
    }
    if (round === "human") {
      console.log(
        `you picked (${humanSelection}) and computer picked (${computerSelection}) you win!`,
      );
      humanScore++;
      showScore();
    }
  }
  declareFinalWinner();
}
function showScore() {
  if (humanScore > computerScore) {
    return console.log(
      `computer score - ${computerScore} and your score - ${humanScore}`,
    );
  } else if (computerScore > humanScore) {
    return console.log(
      `computer score - ${computerScore} and your score - ${humanScore}`,
    );
  } else
    return console.log(
      `computer score - ${computerScore} and your score - ${humanScore}`,
    );
}
function declareFinalWinner() {
  if (computerScore > humanScore) {
    return console.log(
      `computer Final score - ${computerScore} and your Final score - ${humanScore} computer wins`,
    );
  } else if (humanScore > computerScore) {
    return console.log(
      `computer Final score - ${computerScore} and your Final score - ${humanScore} you win`,
    );
  } else
    return console.log(
      `computer Final score - ${computerScore} and your Final score - ${humanScore} its a tie game`,
    );
}
playGame();
