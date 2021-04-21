'use strict';

//selecting 
const elPlayer0 = document.querySelector('.player--0');
const elPlayer1 = document.querySelector('.player--1');
const elScore0 = document.getElementById('score--0');
const elScore1 = document.querySelector('#score--1');
const elDice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let currentScore, activePlayer, flag1, playerScores;

// start of game

const newGame = function() {
    currentScore = 0;
    activePlayer = 0;
    playerScores = [0, 0];
    flag1 = true;
    
    elScore0.textContent = 0;
    elScore1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    elDice.classList.add('hidden');
    elPlayer0.classList.remove('player--winner');
    elPlayer1.classList.remove('player--winner');
    elPlayer0.classList.add('player--active');
    elPlayer1.classList.remove('player--active');
};
newGame();

const switchT = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;  
    elPlayer0.classList.toggle('player--active');
    elPlayer1.classList.toggle('player--active');
}

// action
btnRoll.addEventListener('click', function(){
    if(flag1){
    let diceValue = Math.trunc((Math.random() * 6) + 1);

    elDice.classList.remove('hidden');
    elDice.src = `dice-${diceValue}.png`;

    if(diceValue !== 1){
        currentScore += diceValue;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else{
        switchT();
    }
}
});

btnHold.addEventListener('click', function() {
    if(flag1){
    playerScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = 
    playerScores[activePlayer];  

    if (playerScores[activePlayer] >= 21){
        flag1 = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        elDice.classList.add('hidden');
    }
    else {
    switchT();
    }
}
});

btnNew.addEventListener('click', newGame);
        
