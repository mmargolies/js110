const rlSync = require('readline-sync');

const EMPTY_MARKER    = ' ';
const USER_MARKER     = 'X';
const COMPUTER_MARKER = 'O';
const FIRST_MOVE      = 'choose';

const GAMES_TO_WIN    = 3;
const MIDDLE_SQUARE   = 5;

const WINNING_COMBOS  = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

function prompt(message) {
  console.log(`>> ${message}`);
}
function clearConsole() {
  console.clear();
}

function waitForAcknowledgement() {
  rlSync.question(
    '(Press Enter to continue...)\n', {hideEchoBack: true, mask: ''}
  );
}

function greetUser() {
  prompt('Welcome to Tic-Tac-Toe!');
  prompt('First one to three games is the winner!\n');
}

function chooseWhoMovesFirst() {
  if (FIRST_MOVE !== 'choose') return null;

  clearConsole();

  prompt('Choose who goes first:\n');
  prompt("1) The user (that's you!!)");
  prompt('2) The computer');
  prompt('3) Random choice\n');

  return rlSync.question().trim();
}

function randomChoice() {
  let randChoice = Math.floor(Math.random() * 2);

  if (randChoice === 0) return 'user';

  return 'computer';
}

function convertChoiceForFirstMove(userChoice) {
  switch (userChoice) {
    case '1': return 'user';
    case '2': return 'computer';
    case '3': return randomChoice();
    default: return null;
  }
}

function validateFirstMoveChoice(userChoice) {
  while (!['1', '2', '3'].includes(userChoice)) {
    clearConsole();

    prompt('Please choose a valid option for who will go first: \n');
    prompt('1) The user');
    prompt('2) The computer');
    prompt('3) Random choice\n');

    userChoice = rlSync.question().trim();
  }
  return convertChoiceForFirstMove(userChoice);
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

function validateUserChoice(boardObj, userChoice) {
  let validSquares = openSquares(boardObj);

  while (!validSquares.includes(userChoice)) {
    displayBoard(boardObj);

    prompt(`Please enter a valid square (${joinOr(validSquares)}): `);
    userChoice = rlSync.question().trim();
  }

  boardObj[userChoice] = USER_MARKER;
}

function findAtRiskSquare(squares, boardObj, marker) {
  let line = squares.map(sqr => boardObj[sqr]);

  if (line.filter(sqr => sqr === marker).length === 2) {
    let move = squares.find(sqr => boardObj[sqr] === EMPTY_MARKER);
    return move;
  }
  return null;
}

function offensiveMove(compChoice, boardObj) {
  for (let combo of WINNING_COMBOS) {
    compChoice = findAtRiskSquare(combo, boardObj, COMPUTER_MARKER);
    if (compChoice) break;
  }

  return compChoice;
}

function defensiveMove(compChoice, boardObj) {
  for (let combo of WINNING_COMBOS) {
    compChoice = findAtRiskSquare(combo, boardObj, USER_MARKER);
    if (compChoice) break;
  }

  return compChoice;
}

function middleSqOpen(boardObj) {
  return boardObj[MIDDLE_SQUARE] === EMPTY_MARKER;
}

function computerChoice(boardObj) {
  let choice;

  choice = offensiveMove(choice, boardObj);

  if (!choice) choice = defensiveMove(choice, boardObj);

  if (!choice && middleSqOpen(boardObj)) choice = MIDDLE_SQUARE;

  if (!choice) {
    let validSquares = openSquares(boardObj);
    let choiceIdx = Math.floor(Math.random() * validSquares.length);
    choice = validSquares[choiceIdx];
  }

  boardObj[choice] = COMPUTER_MARKER;
}

function chooseSquare(boardObj, currentPlayer) {
  if (currentPlayer === 'user') {
    validateUserChoice(boardObj, getUserChoice(boardObj));
  } else if (currentPlayer === 'computer') {
    computerChoice(boardObj);
  }
}

function alternatePlayer(currentPlayer) {
  return currentPlayer === 'user' ? 'computer' : 'user';
}

function boardIsFull(boardObj) {
  return openSquares(boardObj).length === 0;
}

function isWinningCombo(combos, boardObj, marker) {
  return combos.some(winCombo => winCombo.every(sqr => {
    return boardObj[sqr] === marker;
  }));
}

function detectRoundWinner(boardObj) {
  if (isWinningCombo(WINNING_COMBOS, boardObj, USER_MARKER)) {
    return 'user';
  } else if (isWinningCombo(WINNING_COMBOS, boardObj, COMPUTER_MARKER)) {
    return 'computer';
  }

  return null;
}

function someoneWon(boardObj) {
  return !!detectRoundWinner(boardObj);
}

function incrementScore(result, scoreObj) {
  switch (result) {
    case 'user':   scoreObj.userWins += 1;
      break;
    case 'computer': scoreObj.computerWins += 1;
      break;
  }
}

function displayRoundWinner(result) {
  switch (result) {
    case 'user':     return "You've won!! Congrats :)\n";
    case 'computer': return "The computer won, oh well.\n";
    default:         return "It's a tie!\n";
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

function playRound(boardObj, scoreObj) {
  let currentMove = FIRST_MOVE;

  if (currentMove === 'choose') {
    currentMove = validateFirstMoveChoice(chooseWhoMovesFirst());
  }

  while (true) {
    displayBoard(boardObj);
    displayMatchScore(scoreObj);
    chooseSquare(boardObj, currentMove);
    currentMove = alternatePlayer(currentMove);
    if (boardIsFull(boardObj) || someoneWon(boardObj)) break;
  }

  displayBoard(boardObj);
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