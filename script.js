'use-strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

dice.classList.add('hidden');

let scores, currentScore, activePlayer, playing

const initialState = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0
  score1.textContent = 0
  current0.textContent = 0
  current1.textContent = 0

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}
initialState()

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

newGame.addEventListener('click', () => {
  initialState()
})

rollBtn.addEventListener('click', () => {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer()
    }
  }
})

holdBtn.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;

      dice.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer()
    }
  }
})

