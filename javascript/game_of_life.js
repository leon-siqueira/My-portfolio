const canvas = document.getElementById('gol-canvas');
const ctx = canvas.getContext('2d');

const cellSize = 8;
let numRows = setNumRows();
let numCols = setNumCols();
canvas.width = numCols * cellSize;
canvas.height = numRows * cellSize;

let board = createBoard(numRows, numCols);

function createBoard(numRows, numCols) {
  const board = [];
  for (let row = 0; row < numRows; row++) {
    board[row] = [];
    for (let col = 0; col < numCols; col++) {
      board[row][col] = Math.random() < 0.382 ? 1 : 0;
    }
  }
  return board;
}

function drawBoard() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;
      ctx.fillStyle = board[row][col] ? '#999' : '#eee';
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function updateBoard() {
  const newBoard = createBoard(numRows, numCols);
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const neighbors = getNumNeighbors(row, col, board);
      const alive = board[row][col];
      if (alive && (neighbors < 2 || neighbors > 3)) {
        newBoard[row][col] = 0;
      } else if (!alive && neighbors === 3) {
        newBoard[row][col] = 1;
      } else {
        newBoard[row][col] = board[row][col];
      }
    }
  }
  return newBoard;
}

function getNumNeighbors(row, col, board) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const r = row + i;
      const c = col + j;
      if (r < 0 || r >= numRows || c < 0 || c >= numCols) continue;
      count += board[r][c];
    }
  }
  return count;
}

function getWrapperHeight() {
  return document.querySelector('#canvas-container').clientHeight;
}

function setNumRows() {
  return getWrapperHeight() % cellSize === 0 ? getWrapperHeight() / cellSize : Math.floor(getWrapperHeight() / cellSize) - 1
}

function getWrapperWidth() {
  return document.querySelector('#canvas-container').clientWidth;
}

function setNumCols() {
  return getWrapperWidth() % cellSize === 0 ? getWrapperWidth() / cellSize : Math.floor(getWrapperWidth() / cellSize) - 1
}

function tick() {
  board = updateBoard();
  drawBoard();
  setTimeout(() => {
    requestAnimationFrame(tick);
  }, 83);
}

window.onresize = () => {
  canvas.width = Math.floor(setNumCols()) * cellSize;
  canvas.height = Math.floor(setNumRows()) * cellSize;
  board = createBoard(numRows, numCols);
}

tick();
