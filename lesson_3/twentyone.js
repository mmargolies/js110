const BUST_LIMIT = 21;
const DEALER_LIMIT = 17;
const CARD_VALUES = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'
];
const SUITS = ['H', 'D', 'S', 'C'];
const ROUNDS_TO_WIN_MATCH = 3;

const rlSync = require('readline-sync');

function prompt(message) {
  console.log(`>> ${message}`);
}

function clearConsole() {
  console.clear();
}

function clearEndLines(lines) {
  process.stdout.moveCursor(0, -lines);
  process.stdout.clearScreenDown();
}

function joinOr(arr, delim = ', ', word = 'and') {
  if (arr.length < 2) return arr.join('');

  return arr.slice(0, (arr.length - 1)).join(delim) +
  ` ${word} ${arr[arr.length - 1]}`;
}

function generateScorecard() {
  return {
    userWins: 0,
    computerWins: 0,
    matchIsOver() {
      return this.userWins === ROUNDS_TO_WIN_MATCH ||
             this.computerWins === ROUNDS_TO_WIN_MATCH;
    },
    resetWins () {
      this.userWins = 0;
      this.computerWins = 0;
    }
  };
}

function waitForAcknowledgement() {
  rlSync.question(
    '(Press Enter to continue...)\n', {hideEchoBack: true, mask: ''}
  );
}

function greetUser() {
  clearConsole();
  prompt('Welcome to 21!');
  console.log(
    '-----------------------------------------------------------------\n'
  );
}

function sayGoodbye() {
  clearConsole();
  prompt('Thank you for playing! :)');
}

function displayRules() {
  prompt('Try to get as close to 21 as you can!');
  prompt('If your hand total is greater than 21, you lose the round!');
  prompt('Face cards have a value of 10, and aces are 1 or 11.');
  prompt('The optimal ace value will be determined for you.\n');
  prompt("You'll be playing a best-of-five match agains the computer!\n");
}

function generateDeck() {
  let deck = [];
  SUITS.forEach(suit => CARD_VALUES.forEach(card => deck.push([suit, card])));

  return deck;
}

function shuffleCards(deck) {
  for (let idx = deck.length - 1; idx > 0; idx -= 1) {
    let otheridx = Math.floor(Math.random() * (idx + 1)); // 0 to idx
    [deck[idx], deck[otheridx]] = [deck[otheridx], deck[idx]]; // swap elements
  }

  return deck;
}

function dealHand(deck) {
  return deck.splice(0, 2);
}

function dealCard(deck) {
  return deck.splice(0, 1);
}

function getCardValues(hand) {
  return hand.map(cards => cards[1]);
}

function sumHand(hand) {
  let total = 0;
  let aces = 0;
  let handValues = getCardValues(hand);

  handValues.forEach(card => {
    if (['Jack', 'Queen', 'King'].includes(card)) {
      total += 10;
    } else if (card.includes('Ace')) {
      total += 11;
      aces += 1;
    } else {
      total += Number(card);
    }
  });

  total = determineAceValues(aces, total);

  return total;
}

function determineAceValues(numOfAces, handValue) {
  while (numOfAces > 0) {
    if (handValue > BUST_LIMIT) handValue -= 10;
    numOfAces -= 1;
  }

  return handValue;
}

function getChoiceToHitOrStay() {
  prompt('Would you like to hit or stay? (h/s, hit/stay)');
  return rlSync.question().trim().toLowerCase();
}

function validateHitOrStay(choice) {
  while (!['hit', 'h', 'stay', 's'].includes(choice)) {
    clearEndLines(2);
    prompt('Please enter a valid choice (h/s, hit/stay)');
    choice = rlSync.question().trim().toLowerCase();
  }

  return choice;
}

function keepHitting() {
  let choice = validateHitOrStay(getChoiceToHitOrStay());

  return ['h', 'hit'].includes(choice);
}

function busted(handTotal) {
  return handTotal > BUST_LIMIT;
}

function displayUserHand(hand) {
  let total = sumHand(hand);
  let handValues = getCardValues(hand);
  prompt(`You have: ${joinOr(handValues)} for a total of ${total}`);
}

function displayComputerHand(hand) {
  let handValues = getCardValues(hand).slice(0, -1);
  prompt(`Dealer has: ${joinOr(handValues)} and an unknown card`);
}

function revealComputerHand(hand) {
  let handValues = getCardValues(hand);
  prompt (
    `The Dealer finished with: ${joinOr(handValues)} for a total of: ` +
    `${sumHand(hand)}`
  );
}

function displayHands(playerHand, cpuHand) {
  // clearConsole();
  displayUserHand(playerHand);
  displayComputerHand(cpuHand);
  console.log('\n');
}

function displayFinalHands(playerHand, cpuHand) {
  // clearConsole();
  displayUserHand(playerHand);
  revealComputerHand(cpuHand);
  console.log('\n');
}

function displayMatchScore(scoreObj) {
  console.clear();
  if (scoreObj.userWins + scoreObj.computerWins > 0) {
    console.log(
      `The match score is (You) ${scoreObj.userWins} -- ` +
      `${scoreObj.computerWins} (computer)\n`
    );
  }
}

function hitUser(hand, deck) {
  hand.push(dealCard(deck).flat());

  return hand;
  // this mutates the user's hand, needed to do so bc of my implementation
  // for incrementing the score
}

function userTurn(playerHand, deck, cpuHand, scoreObj) {
  while (keepHitting()) {
    clearConsole();

    playerHand = hitUser(playerHand, deck);
    if (busted(sumHand(playerHand))) break;

    displayMatchScore(scoreObj);
    displayHands(playerHand, cpuHand);
  }

  return playerHand;
}

function hitComputer(hand, deck) {
  while (sumHand(hand) < DEALER_LIMIT) {
    hand.push(dealCard(deck).flat());
  }

  return hand;
  // this mutates the cpu's hand, needed to do so bc of my implementation
  // for incrementing the score
}

function whoBusted(userTotal, computerTotal) {
  if (busted(userTotal) && busted(computerTotal)) {
    return 'bothBust';
  } else if (busted(userTotal)) {
    return 'userBust';
  } else if (busted(computerTotal)) {
    return 'computerBust';
  }

  return null;
}

function determineWinner(userTotal, computerTotal) {
  if (busted(userTotal) || busted(computerTotal)) {
    return whoBusted(userTotal, computerTotal);
  }

  if (userTotal === computerTotal) return 'tie';

  return userTotal > computerTotal ? 'user' : 'computer';
}

function displayUserWin(userTotal, computerTotal) {
  prompt(
    `You won the round with a total of ${userTotal} vs. the dealer's total of` +
    ` ${computerTotal}!!`
  );
}

function displayComputerWin(userTotal, computerTotal) {
  prompt(
    `The dealer won the round with a total of ${computerTotal} vs. your ` +
    `total of ${userTotal}. Oh well.`
  );
}

function displayUserBustMessage(userTotal) {
  prompt(`Busted -- your hand totals to ${userTotal}! Better luck next round.`);
}

function displayComputerBustMessage(computerTotal) {
  prompt(
    `The dealer busted -- their hand totals to ${computerTotal}. ` +
    `You won the round!`
  );
}

function displayBothBust() {
  prompt(`You and the dealer both busted -- it's a tie!`);
}

function displayTie(userTotal) {
  prompt(`It's a tie! Both you and the dealer have a total of ${userTotal}`);
}

function displayWinner(userTotal, computerTotal, winner) {
  switch (winner) {
    case 'user': displayUserWin(userTotal, computerTotal);
      break;
    case 'computerBust': displayComputerBustMessage(computerTotal);
      break;
    case 'computer': displayComputerWin(userTotal, computerTotal);
      break;
    case 'userBust': displayUserBustMessage(userTotal);
      break;
    case 'tie': displayTie(userTotal);
      break;
    case 'bothBust': displayBothBust();
  }
}

function playHand(playerHand, cpuHand, deck, scoreObj) {
  displayMatchScore(scoreObj);
  displayHands(playerHand, cpuHand);

  playerHand = userTurn(playerHand, deck, cpuHand, scoreObj);
  cpuHand = hitComputer(cpuHand, deck);

  displayMatchScore(scoreObj);
  displayFinalHands(playerHand, cpuHand);
  let userHandTotal = sumHand(playerHand);
  let computerHandTotal = sumHand(cpuHand);

  let roundWinner = determineWinner(userHandTotal, computerHandTotal);
  displayWinner(userHandTotal, computerHandTotal, roundWinner);
  console.log();
}

function incrementRoundScore(playerHand, cpuHand, scoreObj) {

  let roundWinner = determineWinner(sumHand(playerHand), sumHand(cpuHand));
  if (['user', 'computerBust'].includes(roundWinner)) {
    scoreObj.userWins += 1;
  } else if (['computer', 'userBust'].includes(roundWinner)) {
    scoreObj.computerWins += 1;
  }
}


function displayMatchWinner(scoreObj) {
  if (scoreObj.userWins === 3) prompt('Congrats, you won the match!!');
  else prompt('The computer wins this match...');
}

function playMatch() {
  let shuffledDeck = shuffleCards(generateDeck());
  const scorecard = generateScorecard();

  do {
    let userHand = dealHand(shuffledDeck);
    let computerHand = dealHand(shuffledDeck);
    playHand(userHand, computerHand, shuffledDeck, scorecard);

    incrementRoundScore(userHand, computerHand, scorecard);

    waitForAcknowledgement();
  } while (!scorecard.matchIsOver());

  clearConsole();
  displayMatchWinner(scorecard);
  scorecard.resetWins();
}

function getChoiceToPlayAgain() {
  prompt('Would you like to play another one? (y/n)');
  return rlSync.question().toLowerCase().trim();
}

function validateChoiceToPlayAgain(userChoice) {
  while (!['y', 'yes', 'n', 'no'].includes(userChoice)) {
    clearEndLines(2);
    prompt('Please enter a valid choice to play again ("y" or "n")');
    userChoice = rlSync.question().toLowerCase().trim();
  }

  return userChoice;
}

function continuePlaying() {
  let userChoice = validateChoiceToPlayAgain(getChoiceToPlayAgain());

  return userChoice === 'y' || userChoice === 'yes';
}

function runApp() {
  greetUser();
  displayRules();
  waitForAcknowledgement();

  do {
    playMatch();
  } while (continuePlaying());

  sayGoodbye();
}

runApp();