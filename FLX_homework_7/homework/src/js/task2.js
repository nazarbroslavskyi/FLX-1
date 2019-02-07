let playAgain = false;
const config = {
  prizeMultiplier: 3,
  rangeMultiplier: 2,
  totalAttempts: 3
};
const gameSettings = {
  prize: 10,
  maxRangeValue: 5,
  totalPrize: 0
};
Object.freeze(config);

if (confirm('Do you want to play a game?')) {
  do {
    playAgain = false;
    let tmpMaxRangeValue = gameSettings.maxRangeValue;
    const randomNumber = Math.floor(Math.random() * ++tmpMaxRangeValue);
    console.log(randomNumber);
  
    for (
      let currentAttempt = 1, currentPrize = gameSettings.prize;
      currentAttempt <= config.totalAttempts;
      currentAttempt++, currentPrize = Math.floor(currentPrize / 2)
    ) {
      const userGuess = parseInt(prompt(`
        Enter a number from 0 to ${gameSettings.maxRangeValue}
        Attempts left: ${config.totalAttempts - currentAttempt}
        Total prize: ${gameSettings.totalPrize}$
        Possible prize on current attempt: ${currentPrize}$`
      ));

      if (!isNaN(userGuess) && userGuess === randomNumber) {
      gameSettings.totalPrize += currentPrize;
      if (confirm(`
        Congratulation! Your prize is: ${gameSettings.totalPrize}$ 
        Do you want to continue?`)
      ) {
        gameSettings.prize *= config.prizeMultiplier;
        gameSettings.maxRangeValue *= config.rangeMultiplier;
        playAgain = true;
        break;
      }
      } else if (isNaN(userGuess)) {
        alert('You did not become a millionaire, but can.');
        break;
      } else if (currentAttempt === config.totalAttempts) {
        alert(`Thank you for a game. Your prize is: ${gameSettings.totalPrize}$`);
        playAgain = confirm('Do you want to play again?');
        /**
         * I do not understand if I need to reset 
         * the data here { prize: 10,maxRangeValue: 5,totalPrize: 0} .
         */
      }
    }
  } while (playAgain);
} else {
  alert('You did not become a millionaire, but can.');
}
