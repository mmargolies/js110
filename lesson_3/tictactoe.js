const rlSync = require('readline-sync');

const EMPTY_MARKER = ' ';
const USER_MARKER = 'X';
const COMPUTER_MARKER = 'O';

function prompt(message) {
  console.log(`=> ${message}`);
}

function clearConsole() {
  console.clear();
}

function displayBoard(boardObj) {
  clearConsole();

  prompt(`You are ${USER_MARKER}'s, computer is ${COMPUTER_MARKER}'s`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${boardObj['1']}  |  ${boardObj['2']}  |  ${boardObj['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${boardObj['4']}  |  ${boardObj['5']}  |  ${boardObj['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${boardObj['7']}  |  ${boardObj['8']}  |  ${boardObj['9']}`);
  console.log('     |     |');
  console.log('');
}

function generateBoard() {
  let board = {};

  for (let square = 1; square < 10; square += 1) {
    board[square] = EMPTY_MARKER;
  }

  return board;
}

function openSquares(boardObj) {
  return Object.keys(boardObj).filter(square => {
    return boardObj[square] === EMPTY_MARKER;
  });
}

function joinOr(arr, delim = ', ', word = 'or') {
  if (arr.length < 2) return arr.join('');

  return `${arr.slice(0, (arr.length - 1)).join(delim)} ${word} ` +
         `${arr[arr.length - 1]}`;
}

function getUserChoice(boardObj) {
  let validSquares = openSquares(boardObj);
  prompt(`Choose a square (${joinOr(validSquares)}):`);
  return rlSync.question().trim();
}

function validateUserChoice(boardObj, choice) {
  let validSquares = openSquares(boardObj);

  while (!validSquares.includes(choice)) {
    prompt(`Please enter a valid square (${validSquares.join(', ')}): `);
    choice = rlSync.question().trim();
  }

  boardObj[choice] = USER_MARKER;
}

function computerChoice(boardObj) {
  let validSquares = openSquares(boardObj);
  let choiceIdx = Math.floor(Math.random() * validSquares.length);

  boardObj[validSquares[choiceIdx]] = COMPUTER_MARKER;
}

function boardIsFull(boardObj) {
  return openSquares(boardObj).length === 0;
}

function isWinningCombo(array, obj, marker) {
  return array.some(winCombo => winCombo.every(key => {
    return obj[key] === marker;
  }));
}

function detectWinner(boardObj) {
  let winCombos = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
    [1, 5, 9], [3, 5, 7]             // diagonals
  ];

  if (isWinningCombo(winCombos, boardObj, USER_MARKER)) {
    return 'player';
  } else if (isWinningCombo(winCombos, boardObj, COMPUTER_MARKER)) {
    return 'computer';
  }

  return null;
}

function someoneWon(boardObj) {
  return !!detectWinner(boardObj);
}

function playRound(boardObj) {
  displayBoard(boardObj);

  while (true) {
    validateUserChoice(boardObj, getUserChoice(boardObj));
    displayBoard(boardObj);
    if (boardIsFull(boardObj) || someoneWon(boardObj)) break;

    computerChoice(boardObj);
    displayBoard(boardObj);

    if (boardIsFull(boardObj) || someoneWon(boardObj)) break;
  }
}

function waitForAcknowledgement() {
  rlSync.question(
    '(Press Enter to begin...)\n', {hideEchoBack: true, mask: ''}
  );
}

// eslint-disable-next-line consistent-return
function displayWinner(winner) {
  switch (winner) {
    case 'player':   return "You've won!! Congrats :)";
    case 'computer': return "The computer won, oh well.";
    case null:       return "It's a tie!";
  }
}

function getChoiceToPlayAgain() {
  prompt('Would you like to play again? (y/n)');
  return rlSync.question().toLowerCase().trim();
}

function validateChoiceToPlayAgain(choice) {
  while (!['y', 'yes', 'n', 'no'].includes(choice)) {
    prompt('please enter "y" or "n"');
    choice = rlSync.question().toLowerCase().trim();
  }

  return choice;
}

function continuePlaying() {
  let choice = validateChoiceToPlayAgain(getChoiceToPlayAgain());

  if (choice === 'y' && 'yes') return true;

  return false;
}

function runApp() {
  prompt('Welcome to Tic-Tac-Toe!');
  waitForAcknowledgement();

  do {
    const board = generateBoard();
    playRound(board);
    prompt(displayWinner(detectWinner(board)));
  } while (continuePlaying());

  clearConsole();
  prompt("Until next time!");
}

runApp();