'use-strict';
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');

let dice = document.querySelector('.dice')
let diceRoll;
let numberScore0;
let numberCurrent0;
let numberScore1;
let numberCurrent1;

const switchPlayer = () => {
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active')
    player2.classList.add('player--active')
  } else {
    player2.classList.remove('player--active')
    player1.classList.add('player--active')
  }
}

const resetAll = () => {
  diceRoll = 0
  currentScore0 = 0
  currentScore1 = 0
  current0.textContent = 0
  current1.textContent = 0
}

let currentScore0 = 0
let currentScore1 = 0
rollBtn.addEventListener('click', () => {
  diceRoll = Math.trunc(Math.random() * 6) + 1;

  dice.src = `dice-${diceRoll}.png`
  if (diceRoll == 1) {
    resetAll()
    switchPlayer()
  }
  if (player1.classList.contains('player--active')) {
    current0.textContent = currentScore0 += diceRoll
  } else {
    current1.textContent = currentScore1 += diceRoll
  }
})

holdBtn.addEventListener('click', () => {
  if (player1.classList.contains('player--active')) {
    numberScore0 = Number(score0.textContent)
    numberCurrent0 = Number(current0.textContent)
    score0.textContent = (numberScore0 + numberCurrent0)
  } else {
    numberScore1 = Number(score1.textContent)
    numberCurrent1 = Number(current1.textContent)
    score1.textContent = (numberScore1 + numberCurrent1)
  }
  resetAll()
  switchPlayer()

  if (Number(score0.textContent) >= 100) {
    player2.classList.remove('player--active')
    player1.classList.add('player--winner')
  }
  if (Number(score1.textContent) >= 100) {
    player1.classList.remove('player--active')
    player2.classList.add('player--winner')
  }
})

newGame.addEventListener('click', () => {
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner')
  } else {
    player2.classList.remove('player--winner')
  }
  player2.classList.remove('player--active')
  player1.classList.add('player--active')
  player2.classList.remove('player--active')
  player1.classList.add('player--active')

  score1.textContent = 0
  score0.textContent = 0
  dice.src = 'dice-5.png'
  resetAll()
})
