function getComputerChoice() {
  const computer = Math.floor(Math.random() * 3);
  if (computer === 0) return "rock";
  if (computer === 1) return "scissors";
  return "paper";
}
const userChoice = document.querySelectorAll("button");
userChoice.forEach((button) => {
  button.addEventListener("click", function (event) {
    let choice = event.target.id;
    let computerChoice = getComputerChoice();
    let result = determineWinner(choice, computerChoice);
    updateUi(computerChoice, choice, result);
    updateScore(result);
    showScore();
    declareFinalWinner();
  });
});

function determineWinner(choice, computerChoice) {
  let userChoice = choice;
  if (userChoice === computerChoice) {
    return "tie";
  }
  if (
    (userChoice === "rock" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "rock")
  ) {
    return "computer";
  }
  return "human";
}
let userScore = 0;
let computerScore = 0;

function updateUi(comChoice, humChoice, result) {
  let displayComChoice = document.querySelector("#com-result");
  let displayHumChoice = document.querySelector("#hum-result");
  let displayResult = document.querySelector("#result");
  if (result === "tie") {
    displayComChoice.textContent = `computer picked ${comChoice}`;
    displayHumChoice.textContent = `you picked ${humChoice}`;
    displayResult.textContent = `Its a tie`;
  }
  if (result === "computer") {
    displayComChoice.textContent = `computer picked ${comChoice}`;
    displayHumChoice.textContent = `you picked ${humChoice}`;
    displayResult.textContent = `computer wins`;
  }
  if (result === "human") {
    displayComChoice.textContent = `computer picked ${comChoice}`;
    displayHumChoice.textContent = `you picked ${humChoice}`;
    displayResult.textContent = `you win!!`;
  }
}
/* declareFinalWinner(); */
function updateScore(scoreResult) {
  if (scoreResult === "computer") {
    computerScore++;
  }
  if (scoreResult === "human") {
    userScore++;
  }
}
function showScore() {
  let displayHumScore = document.querySelector("#hum-score");
  let displayComScore = document.querySelector("#com-score");
  let comScore = computerScore;
  let humScore = userScore;

  displayComScore.textContent = ` computer Score = ${comScore}`;
  displayHumScore.textContent = `your score = ${humScore}`;
}
function declareFinalWinner() {
  let finalWinner = document.querySelector("#final-winner");
  if (computerScore === 5 || userScore === 5) {
    finalWinner.textContent = `Final score: You - ${userScore} and computer - ${computerScore}\n
    Thank you for Playing `;
  }
}
