

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerStand = false;
let showDealer = false;
let gains = 1000;
let betAmount = 0;
let ifDouble = false;

const bgMusic = document.getElementById('bg-music');
const dealerCardsDiv = document.getElementById('dealer-cards');
const playerCardsDiv = document.getElementById('player-cards');
const dealerCard = document.getElementById('dealerBack');
const messageDiv = document.getElementById('message');

const betInputElement = document.getElementById('bet-input');
document.getElementById('deal').onclick = startGame;
document.getElementById('deal').disabled = true;

document.getElementById('hit').onclick = () => hit(playerHand, playerCardsDiv);
document.getElementById('stand').onclick = () => {

  playerStand = true;
  dealerTurn();

};
document.getElementById('double').onclick = async () => {
  
  ifDouble = true;
  gains -= betAmount;
  updateScore();

  await hit(playerHand, playerCardsDiv);

  const total = calculateTotal(playerHand);

  if (total > 21) {
    endGame("You busted! Dealer wins.");
    return;
  }

  playerStand = true;
  dealerTurn();

};

function createDeck() {

  deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  deck.sort(() => Math.random() - 0.5); //shuffle

}

function drawCard(hand, displayDiv) {

  const card = deck.pop();
  hand.push(card);
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.textContent = `${card.rank}${card.suit}`;

  animateCardToTarget(cardDiv, displayDiv);

}

function drawDealer(hand, displayDiv) {

 const hiddenCard = deck.pop();
  dealerHand.push(hiddenCard);

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'card-wrapper';
  cardWrapper.style.position = 'relative';
  cardWrapper.style.width = '72px';
  cardWrapper.style.height = '102px';

  //Real card
  const hiddenCardDiv = document.createElement('div');
  hiddenCardDiv.className = 'card';
  hiddenCardDiv.textContent = `${hiddenCard.rank}${hiddenCard.suit}`;
  hiddenCardDiv.style.opacity = '0';
  hiddenCardDiv.id = 'hidden-dealer-card';
  hiddenCardDiv.style.position = 'absolute';
  hiddenCardDiv.style.top = '0';
  hiddenCardDiv.style.left = '0';

  //Back card
  const cardBackDiv = document.createElement('div');
  cardBackDiv.className = 'card';
  cardBackDiv.style.backgroundImage = 'url("Assets/cardBack.png")';
  cardBackDiv.style.backgroundSize = 'cover';
  cardBackDiv.style.backgroundPosition = 'center';
  cardBackDiv.style.color = 'transparent';
  cardBackDiv.id = 'dealer-back-img';
  cardBackDiv.style.position = 'absolute';
  cardBackDiv.style.top = '0';
  cardBackDiv.style.left = '0';

  //Both to wrapper
  cardWrapper.appendChild(hiddenCardDiv);
  cardWrapper.appendChild(cardBackDiv);
  displayDiv.appendChild(cardWrapper);

  animateCardToTarget(cardBackDiv, cardWrapper);
}

function calculateTotal(hand) {

  let total = 0;
  let aces = 0;

  for (let card of hand) {

    if (['J', 'Q', 'K'].includes(card.rank)) total += 10;

    else if (card.rank === 'A') {

      total += 11;
      aces += 1;
    } else {

      total += parseInt(card.rank);

    }

  }

  //handles aces
  while (total > 21 && aces > 0) {

    total -= 10;
    aces -= 1;

  }

  return total;
}

async function startGame() {

  playerHand = [];
  dealerHand = [];
  playerStand = false;

  createDeck();

  dealerCardsDiv.innerHTML = '';
  playerCardsDiv.innerHTML = '';
  messageDiv.textContent = '';

  gains -= betAmount;
  document.getElementById('betButton').disabled = true;
  document.getElementById('deal').disabled = true;
  updateScore();

  drawCard(playerHand, playerCardsDiv);
  await delay(200);
  drawDealer(dealerHand, dealerCardsDiv);
  await delay(200);
  drawCard(playerHand, playerCardsDiv);
  await delay(200);
  drawCard(dealerHand, dealerCardsDiv);
  await delay(200);

  document.getElementById('hit').disabled = false;
  document.getElementById('stand').disabled = false;
  document.getElementById('double').disabled = false;

}

async function hit(hand, displayDiv) {

  document.getElementById('hit').disabled = true;
  document.getElementById('double').disabled = true;

  drawCard(hand, displayDiv);
  await delay(1000)

  const total = calculateTotal(playerHand);

  if (total > 21) {
    endGame('You busted! Dealer wins.');
  } else {
    document.getElementById('hit').disabled = false;
  }

}

async function dealerTurn() {

  document.getElementById('hit').disabled = true;
  document.getElementById('stand').disabled = true;
  document.getElementById('double').disabled = true;

  document.getElementById('hidden-dealer-card').style.opacity = '1';
  document.getElementById('dealer-back-img').remove();

  await delay(500);

  while (calculateTotal(dealerHand) < 17) {

    drawCard(dealerHand, dealerCardsDiv);
    await delay(1000);

  }

  const playerTotal = calculateTotal(playerHand);
  const dealerTotal = calculateTotal(dealerHand);

   if (playerTotal > dealerTotal || dealerTotal > 21) {
      if (ifDouble === true) {
          gains += betAmount * 4;
          ifDouble = false;
    } else {
          gains += betAmount * 2;
    }

    endGame("You win!");

  } else if (dealerTotal > playerTotal) {

    endGame("Dealer wins.");

  } else {

    if (ifDouble === true) {
        gains += betAmount * 2;
        ifDouble = false;
    } else {
        gains += betAmount;
    }
    endGame("It's a tie!");
  }

  updateScore();
  document.getElementById('betButton').disabled = false;
}

function updateScore() {
  document.getElementById('score').textContent = `Your Chips: $${gains}`;
}

function placeBet() {
  const input = parseInt(betInputElement.value);

  if (isNaN(input) || input <= 0) {

    alert("Invalid bet");

    return;
  }

   bgMusic.play();

  betAmount = input;
  document.getElementById('deal').disabled = false;

  document.getElementById('begin').style.opacity = '0';
  document.getElementById('curBet').style.opacity = '100';
  document.getElementById('score').style.opacity = '100';

  document.getElementById('curBet').textContent = `Current Bet: $${betAmount}`;
  updateScore();
  betInputElement.value = '';
}

function endGame(message) {

  messageDiv.textContent = message;
  document.getElementById('hit').disabled = true;
  document.getElementById('stand').disabled = true;
  document.getElementById('double').disabled = true;
  document.getElementById('deal').disabled = false;

}

function animateCardToTarget(cardDiv, targetDiv) {
 
  const deckRect = document.getElementById('deck').getBoundingClientRect();
  const targetRect = targetDiv.getBoundingClientRect();

  cardDiv.style.left = `${deckRect.left}px`;
  cardDiv.style.top = `${deckRect.top}px`;

  document.body.appendChild(cardDiv);

  getComputedStyle(cardDiv).left;

  cardDiv.style.left = `${targetRect.left + targetRect.width / 2 - 36}px`;
  cardDiv.style.top = `${targetRect.top + targetRect.height / 2 - 51}px`;

  setTimeout(() => {
    cardDiv.style.position = 'static';
    targetDiv.appendChild(cardDiv);
  }, 600);
  
} 

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

