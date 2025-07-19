let rowsNumber = parseInt(localStorage.getItem('rowsNum'))
const container = document.querySelector('.container');
const gridContainer = '<div class="grid-container"></div>';
const reset = document.querySelector('.reset_btn');
reset.insertAdjacentHTML('beforebegin', gridContainer);
const gridSelected = container.querySelector('.grid-container');
gridSelected.style.gridTemplateColumns = `repeat(${rowsNumber}, 1fr)`;
const x = '<span class="x">X</span>';
const o = '<span class="o">O</span>';
const playerXscore = document.querySelector('#ScoreX');
const playerOscore = document.querySelector('#ScoreO');

const mainMenuBtn = document.querySelector('.mainMenuBtn');
const playAgainBtn = document.querySelector('.playAgainBtn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalTitle = document.querySelector('#modalTitle');
const resetScoresBtn = document.querySelector('.reset_scores_btn');

let currentPlayer = 'X';
let turn = true;
let turnCount = 0;

let playerStartFirst = true;
let scoreX = 0;
let scoreO = 0;

const checkWinLength = (rowsNumber) => {
  let winLength = 3;
  if(rowsNumber === 3) {
    winLength = 3;
  }
  else if(rowsNumber > 3 && rowsNumber < 9) {
    winLength = 4;
  }
  else {
    winLength = 5;
  }
  return winLength
}

const showModal = (text) => {
  modal.classList.add('modal--isActive');
  overlay.classList.add('overlay--isActive');
  modalTitle.innerText = text;
}

const closeModal = () => {
  modal.classList.remove('modal--isActive');
  overlay.classList.remove('overlay--isActive');
}

const renderResetScores = () => {
  playerXscore.innerText = '0';
  playerOscore.innerText = '0';
}

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

const setPlayersScore = () => {
  if(localStorage.getItem('scoreX')){
    scoreX = parseInt(localStorage.getItem('scoreX'));
    scoreO = parseInt(localStorage.getItem('scoreO'));
    playerXscore.innerText = scoreX;
    playerOscore.innerText = scoreO;
  } 
  else {
    renderResetScores();
  }
}


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

const resetGame = (resetGameFlag, resetScoresFlag) => {
  cells.forEach((item) => {
    item.innerHTML = '';
  })
  board = createBoard(rowsNumber);
  if(resetGameFlag){
  playerStartFirst = !playerStartFirst;
  }
  if(resetScoresFlag) {
    playerStartFirst = true;
  }
  turnCount = 0;
  turnAfterRoundEnd();
}

const hasWon = () => {
    let winner = currentPlayer;
    setTimeout(() => {
      showModal(`Player ${winner} has won`);
      updateScores();
      resetGame(true, false);
    }, 200)
    return true;
}

const checkDraw = () => {
  if(turnCount === rowsNumber ** 2 && !hasWon()){
    setTimeout(() => {
      showModal("It's a draw!");
      resetGame(true, false);
    }, 200)
  }
}

const checkRow = (winLength) => {
  for(let row = 0; row < rowsNumber; row++){
    let count = 0;
    for(let column = 0; column < rowsNumber; column++){
      if(board[row][column] === currentPlayer) {
        count++;
        if(count === winLength) {
          hasWon();
          return;
        }
      } else {
        count = 0;
      }
    }
  }
}

const checkColumn = (winLength) => {
  for (let col = 0; col < rowsNumber; col++) {
    let count = 0;
    for (let row = 0; row < rowsNumber; row++) {
      if (board[row][col] === currentPlayer) {
        count++;
        if (count === winLength) {
          hasWon();
          return;
        }
      } else {
        count = 0;
      }
    }
  }
};


const checkDiagonal = (winLength) => {
  let count = 0;
  let count2 = 0;
  for(let i = 0; i <= (rowsNumber - winLength); i++){
    let temp = i;
    for(let j = 0; j < rowsNumber - i; j++) {
      if(board[temp][j] === currentPlayer) {
        count++;
        if(count === winLength) {
          hasWon();
          return;
        }
      } 
      else {
        count = 0;
      }
      if(board[j][temp] === currentPlayer) {
        count2++;
        if(count2 === winLength) {
          hasWon();
          return;
        }
      } 
      else {
        count2 = 0;
      }
      temp++;
    }
  }
}


const checkReverseDiagonal = (winLength) => {
  let count = 0;
  let count2 = 0;
  for(let i = 0; i <= (rowsNumber - winLength); i++){
    let temp = i;
    let temp2 = 0;
    let temp4 = rowsNumber - (i + 1);
    for(let j = rowsNumber - 1; j >= i; j = j - 1) {
    let temp3 = j - 1;
      if(board[temp][j] === currentPlayer) {
        count++;
        if(count === winLength) {
          hasWon();
          return;
        }
      } 
      else {
        count = 0;
      }
      if(board[temp2][temp4] === currentPlayer) {
        count2++;
        console.log(count2);
        if(count2 === winLength) {
          hasWon();
          return;
        }
      } 
      else {
        count2 = 0;
      }
      temp++;
      temp2++;
      temp4 = temp4 - 1;
    }
  }
};


const checkWin = (winLength) => {
    checkRow(winLength);
    checkColumn(winLength);
    checkDiagonal(winLength);
    checkReverseDiagonal(winLength);
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
    playerOscore.innerText = scoreO;
    localStorage.setItem('scoreO', scoreO);
  }
  if(turn === false){
    scoreX++;
    playerXscore.innerText = scoreX;
    localStorage.setItem('scoreX', scoreX);
  }
}

const resetScores = () => {
  scoreX = 0;
  scoreO = 0;
  localStorage.setItem('scoreX', scoreX);
  localStorage.setItem('scoreO', scoreO);
  resetGame(false, true);
  renderResetScores();
}



drawBoardGUI();
setPlayersScore();
const cells = gridSelected.querySelectorAll('.input-box');
let array = createBoardArr();
let board = createBoard(rowsNumber);
let winLength = checkWinLength(rowsNumber);

reset.addEventListener('click', () => resetGame(false, false));
resetScoresBtn.addEventListener('click', resetScores)
playAgainBtn.addEventListener('click', closeModal);
mainMenuBtn.addEventListener('click', () => window.location.href = '../main_menu/main_menu.html');

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
                console.log(currentPlayer);

            }
            else{
              event.currentTarget.insertAdjacentHTML('afterbegin', o);
              board[i][j] = 'O';
              currentPlayer = 'O';
                console.log(currentPlayer);

            }
            turnCount += 1;
            turn = !turn;
            checkWin(winLength);
            checkDraw();
          }
        }
      })
    }
  }
}

cellClickHandler('click');

cellClickHandler('keydown');
