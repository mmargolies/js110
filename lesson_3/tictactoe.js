const rlSync = require('readline-sync');

const EMPTY_MARKER = ' ';
const USER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const GAMES_TO_WIN = 3;

function prompt(message) {
  console.log(`>> ${message}`);
}

function clearConsole() {
  console.clear();
}

function greetUser() {
  prompt('Welcome to Tic-Tac-Toe!');
  prompt('First one to three games is the winner!\n');
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

function generateScorecard() {
  return {
    userWins: 0,
    computerWins: 0
  };
}

function openSquares(boardObj) {
  return Object.keys(boardObj).filter(square => {
    return boardObj[square] === EMPTY_MARKER;
  });
}

function joinOr(arr, delim = ', ', word = 'or') {
  if (arr.length < 2) return arr.join('');

  return arr.slice(0, (arr.length - 1)).join(delim) +
         `${delim}${word} ${arr[arr.length - 1]}`;

}

function displayMatchScore(scoreObj) {
  prompt(
    `The score is: (You) ${scoreObj.userWins} -- ` +
    `${scoreObj.computerWins} (Computer)\n`
  );
}

function getUserChoice(boardObj) {
  let validSquares = openSquares(boardObj);
  prompt(`Choose a square (${joinOr(validSquares)}):`);

  return rlSync.question().trim();
}

function validateUserChoice(boardObj, choice) {
  let validSquares = openSquares(boardObj);

  while (!validSquares.includes(choice)) {
    displayBoard(boardObj);

    prompt(`Please enter a valid square (${joinOr(validSquares)}): `);
    choice = rlSync.question().trim();
  }

  boardObj[choice] = USER_MARKER;
}

function computerChoice(boardObj) {
  let validSquares = openSquares(boardObj);
  let choiceIdx = Math.floor(Math.random() * validSquares.length);

  boardObj[validSquares[choiceIdx]] = COMPUTER_MARKER;
}

function chooseSquare(boardObj, player) {
  if (player === 'user') {
    validateUserChoice(boardObj, getUserChoice(boardObj));
  } else if (player === 'cpu') {
    computerChoice(boardObj);
  }
}

function alternatePlayer(player) {
  return player === 'user' ? 'cpu' : 'user';
}

function boardIsFull(boardObj) {
  return openSquares(boardObj).length === 0;
}

function isWinningCombo(array, obj, marker) {
  return array.some(winCombo => winCombo.every(key => {
    return obj[key] === marker;
  }));
}

function detectRoundWinner(boardObj) {
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
  return !!detectRoundWinner(boardObj);
}

function playRound(boardObj, scoreObj) {
  let currentPlayer = 'user';

  while (true) {
    displayBoard(boardObj);
    displayMatchScore(scoreObj);

    chooseSquare(boardObj, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (boardIsFull(boardObj) || someoneWon(boardObj)) break;
  }

  displayBoard(boardObj);
}

function waitForAcknowledgement() {
  rlSync.question(
    '(Press Enter to continue...)\n', {hideEchoBack: true, mask: ''}
  );
}

function incrementScore(result, scoreObj) {
  switch (result) {
    case 'player':   scoreObj.userWins += 1;
      break;
    case 'computer': scoreObj.computerWins += 1;
      break;
  }
}

// eslint-disable-next-line consistent-return
function displayRoundWinner(result) {
  switch (result) {
    case 'player':   return "You've won!! Congrats :)\n";
    case 'computer': return "The computer won, oh well.\n";
    case null:       return "It's a tie!\n";
  }
}

function matchIsOver(scoreObj) {
  return scoreObj.userWins === GAMES_TO_WIN ||
         scoreObj.computerWins === GAMES_TO_WIN;
}

function displayGrandWinner(scoreObj) {
  if (scoreObj.userWins === 3) prompt('You won the match!!\n');

  if (scoreObj.computerWins === 3) prompt('The computer won :/\n');
}

function getChoiceToPlayAgain() {
  prompt('Would you like to play again? (y/n)');
  return rlSync.question().toLowerCase().trim();
}

function validateChoiceToPlayAgain(userChoice) {
  while (!['y', 'yes', 'n', 'no'].includes(userChoice)) {
    prompt('please enter "y" or "n"');
    userChoice = rlSync.question().toLowerCase().trim();
  }

  return userChoice;
}

function continuePlaying() {
  let userChoice = validateChoiceToPlayAgain(getChoiceToPlayAgain());

  return userChoice === 'y' || userChoice === 'yes';
}

function playMatch() {
  const scorecard = generateScorecard();

  do {
    const board = generateBoard();

    playRound(board, scorecard);
    let winner = detectRoundWinner(board);
    incrementScore(winner, scorecard);

    prompt(displayRoundWinner(winner));
    waitForAcknowledgement();
  } while (!matchIsOver(scorecard));

  clearConsole();
  displayGrandWinner(scorecard);
}

function runApp() {
  clearConsole();
  greetUser();
  waitForAcknowledgement();

  do {
    playMatch();
  } while (continuePlaying());

  clearConsole();
  prompt('Until next time!');
}

runApp();

// TODO:
// - multiplayer? if so, add a menu

/* function runApp() {
  prompt('Welcome to Tic-Tac-Toe!');
  waitForAcknowledgement();

  do {
    const board = generateBoard();
    playRound(board);
    prompt(displayRoundWinner(detectRoundWinner(board)));
  } while (continuePlaying());

  clearConsole();
  prompt("Until next time!");
}

runApp(); */