let isGameOver = false;
const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  const container = document.querySelector(".container");

  const render = function () {
    for (let i = 0; i < board.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;

      cell.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const marker = updateCell(index);
        if (marker) {
          e.target.textContent = marker;
        }
        gameControl.checkWinner();
      });

      container.appendChild(cell);
    }
  };

  const updateCell = function (index) {
    if (board[index] !== "" || isGameOver) return;
    const marker = gameControl.switchPlayer();
    board[index] = marker;
    return marker;
  };
  const getBoard = () => board;
  return { render, getBoard };
})();
gameBoard.render();
const player = function (name, marker) {
  return { name, marker };
};

const gameControl = (function () {
  let playerOne = player("", "X");
  let playerTwo = player("", "O");

  let activePlayer;

  const playerSelect = document.querySelector(".player-select");
  playerSelect.addEventListener("click", (e) => {
    const name1 = document.querySelector("#p1").value || "player One";
    const name2 = document.querySelector("#p2").value || "Player Two";
    gameControl.playerOne.name = name1;
    gameControl.playerTwo.name = name2;

    if (e.target.classList.contains("button-x")) {
      activePlayer = playerOne;
    } else if (e.target.classList.contains("button-o")) {
      activePlayer = playerTwo;
    }
    console.log(
      `${gameControl.playerOne.name} vs ${gameControl.playerTwo.name}`,
    );
  });

  function switchPlayer() {
    if (!activePlayer) activePlayer = playerOne;
    let currentPlayer = activePlayer.marker;
    if (activePlayer === playerOne) {
      activePlayer = playerTwo;
    } else if (activePlayer === playerTwo) {
      activePlayer = playerOne;
    }
    return currentPlayer;
  }

  function checkWinner() {
    let currentBoard = gameBoard.getBoard();
    let winningLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winFound = false;
    for (let i = 0; i < winningLogic.length; i++) {
      const combination = winningLogic[i];
      const a = combination[0];
      const b = combination[1];
      const c = combination[2];

      const firstCheck = currentBoard[a];
      const secondCheck = currentBoard[b];
      const thirdCheck = currentBoard[c];

      if (
        firstCheck !== "" &&
        firstCheck === secondCheck &&
        firstCheck === thirdCheck
      ) {
        uiControl.showWinner(firstCheck);
        winFound = true;
        isGameOver = true;
        return;
      }
    }
    const isTie = currentBoard.every((cell) => cell !== "");
    if (isTie && !winFound) {
      uiControl.Tie();
      isGameOver = true;
    }
  }

  return { switchPlayer, checkWinner, playerOne, playerTwo };
})();
const uiControl = (function () {
  const winContainer = document.querySelector(".win-message");
  const cells = document.querySelectorAll(".cell");
  const resetGame = function () {
    const resetButton = document.querySelector(".reset-button");

    resetButton.addEventListener("click", () => {
      isGameOver = false;
      const newBoard = gameBoard.getBoard();
      for (let i = 0; i < newBoard.length; i++) {
        newBoard[i] = "";
      }
      cells.forEach((cell) => {
        cell.textContent = "";
      });
      winContainer.innerHTML = "";
    });
  };

  function showWinner(string) {
    winContainer.innerHTML = "";
    const winner = document.createElement("div");
    if (string === "X") {
      winner.textContent = `${gameControl.playerOne.name}  X wins`;
    } else if (string === "O") {
      winner.textContent = `${gameControl.playerTwo.name}  O wins`;
    }
    winContainer.appendChild(winner);
  }
  function Tie() {
    winContainer.innerHTML = "";
    const showTie = document.createElement("div");
    showTie.textContent = "It's a draw. Hit the reset button";
    winContainer.appendChild(showTie);
  }
  resetGame();
  return { showWinner, Tie };
})();
