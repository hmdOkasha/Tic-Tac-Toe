const container = document.querySelector('.container');
const gridContainer = '<div class="grid-container"></div>';
const reset = document.querySelector('.reset_btn');
reset.insertAdjacentHTML('beforebegin', gridContainer);
const gridSelected = container.querySelector('.grid-container');
let rowsNumber = 5;
gridSelected.style.gridTemplateColumns = `repeat(${rowsNumber}, 1fr)`;
const x = '<span class="x">X</span>';
const o = '<span class="o">O</span>';
const playerXscore = document.querySelector('#ScoreX');
const playerYscore = document.querySelector('#ScoreO');

let currentPlayer = 'X';
let turn = true;
let turnCount = 0;
let count = 0;

let playerStartFirst = true;
let scoreX = 0;
let scoreO = 0;


const createBoard = (rowNum) => {
let board = [];
for(let i = 0; i < rowNum; i++){
  board[i] = [];
  for(let j = 0; j < rowNum; j++){
    board[i][j] = '_';
  }
}
return board;
}

const drawBoardGUI = () => {
  let cellsHTML = '';
  for(let i = 0; i < rowsNumber ** 2; i++){
    cellsHTML += `<div class="input-box" role="button" tabindex="${i + 1}"></div>`;
  }
  gridSelected.innerHTML = cellsHTML;
};


const createBoardArr = () => {
  let array = [];
  for (let i = 0; i < rowsNumber; i++) {
    array[i] = Array.from(cells).slice(i * rowsNumber, (i + 1) * rowsNumber);
  }
  return array
}

if(rowsNumber > 5) {
  document.documentElement.style.setProperty('--main-width', '5rem');
}

const resetGame = (flag) => {
  cells.forEach((item) => {
    item.innerHTML = '';
  })
  board = createBoard(rowsNumber);
  if(flag){
  playerStartFirst = !playerStartFirst;
  }
  turnCount = 0;
  turnAfterRoundEnd();
}

const hasWon = () => {
  if(count === rowsNumber){
    let winner = currentPlayer
    setTimeout(() => {
      alert(`Player ${winner} has won`);
      updateScores();
      resetGame(true);
    }, 200)
    return true;
  }
}

const checkDraw = () => {
  if(turnCount === rowsNumber ** 2 && !hasWon){
    setTimeout(() => {
      alert("It's a draw!");
      resetGame(true);
    }, 200)
  }
}

const checkRow = () => {
  for(let row = 0; row < rowsNumber; row++){
    for(let column = 0; column < rowsNumber; column++){
      if(board[row][column] === currentPlayer)
        count++;
      else{
        count = 0;
        break;
      }
      hasWon();
    }
  }
}

const checkColumn = () => {
  for(let column = 0; column < rowsNumber; column++){
    for(let row = 0; row < rowsNumber; row++){
      if(board[row][column] === currentPlayer)
        count++;
      else{
        count = 0;
        break;
      }
      hasWon();
    }
  }
}

const checkMainDiagonal = () => {
  let startingRow = 0;
  let startingColumn = 0;
  for(let i = 0; i < rowsNumber; i++){
    if(board[startingRow][startingColumn] === currentPlayer){
      count++;
      startingRow++;
      startingColumn++;
    }
    else{
      count = 0;
      break;
    }
    hasWon();
  }
}

const checkReverseDiagonal = () => {
  let startingRow = 0;
  let startingColumn = rowsNumber - 1;
  for(let i = 0; i < rowsNumber; i++){
    if(board[startingRow][startingColumn] === currentPlayer){
      count++;
      startingColumn--;
      startingRow++
    }
    else{
      count = 0;
      break;
    }
    hasWon();
  }
}

const checkWin = () => {
    checkRow();
    checkColumn();
    checkMainDiagonal();
    checkReverseDiagonal();
}

const turnAfterRoundEnd = () => {
  if(playerStartFirst) {
    turn = true;
  }
  else
    turn = false;
}

const updateScores = () => {
  if(turn === true){
    scoreO++;
  playerYscore.innerText = scoreO;
  }
  if(turn === false){
    scoreX++;
    playerXscore.innerText = scoreX;
  }
}

drawBoardGUI();
const cells = gridSelected.querySelectorAll('.input-box');
let array = createBoardArr();
let board = createBoard(rowsNumber);
reset.addEventListener('click', () => resetGame(false));


const cellClickHandler = (eventTrigger) => {
  for(let i = 0; i < rowsNumber; i++) {
    for(let j = 0; j < rowsNumber; j++){
      array[i][j].addEventListener(eventTrigger, (event) => {
        if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')){
          if(!event.currentTarget.querySelector('span')){
            if(turn){
              event.currentTarget.insertAdjacentHTML('afterbegin', x);
              board[i][j] = 'X';
              currentPlayer = 'X';
            }
            else{
              event.currentTarget.insertAdjacentHTML('afterbegin', o);
              board[i][j] = 'O';
              currentPlayer = 'O';
            }
            turnCount += 1;
            turn = !turn;
            checkWin();
            checkDraw();
          }
        }
      })
    }
  }
}

cellClickHandler('click');

cellClickHandler('keydown');
