const cells = document.querySelectorAll(".cell");
const menuButtons = document.querySelectorAll(".menu-bar button");
const resetButton = document.getElementById("reset");
const winnerDisplay = document.getElementById("winner");
const board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function handleCellClick(cell) {
  const cellId = parseInt(cell.dataset.cellId);
  if (board[cellId - 1] === null && !gameOver) {
    board[cellId - 1] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    switchPlayer();
    computerMove();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      if (currentPlayer === "X") {
        winnerDisplay.textContent = " You wins!";
      } else winnerDisplay.textContent = " Computer wins!";
      return;
    }
  }

  if (!board.includes(null)) {
    gameOver = true;
    winnerDisplay.textContent = "It's a tie!";
  }
}

function computerMove() {
  if (!gameOver) {
    let emptyCells = [];
    board.forEach((cell, index) => {
      if (!cell) {
        emptyCells.push(index);
      }
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellId = emptyCells[randomIndex];
    if (cellId !== undefined) {
      board[cellId] = currentPlayer;
      cells[cellId].textContent = currentPlayer;
      checkWinner();
      switchPlayer();
    }
  }
}

function resetGame() {
  board.fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  winnerDisplay.textContent = "";
  gameOver = false;
  currentPlayer = "X";
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.style.backgroundImage = `url(image/${button.id}.jpg)`;
  });
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    handleCellClick(cell);
  });
});

resetButton.addEventListener("click", resetGame);
