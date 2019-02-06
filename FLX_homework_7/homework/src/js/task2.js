const gameInfoTemplate = (maxValue, attemptsLeft, totalPrize, currentPrize) => `
Enter a number from 0 to ${maxValue}
Attempts left: ${attemptsLeft}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPrize}$`;
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

confirm('Do you want to play a game?')
  ? playGame()
  : alert('You did not become a millionaire, but can.');

function playGame() {
  do {
  playAgain = false;
  const randomNumber = getRandomNumber(gameSettings.maxRangeValue);

  for (
    let currentAttempt = 1, currentPrize = gameSettings.prize;
    currentAttempt <= config.totalAttempts;
    currentAttempt++, currentPrize = Math.floor(currentPrize / 2)
  ) {
  const userGuess = parseInt(
    prompt(
      gameInfoTemplate(
        gameSettings.maxRangeValue,
        config.totalAttempts - currentAttempt,
        gameSettings.totalPrize,
        currentPrize
      )
    )
    );

    if (!isNaN(userGuess) && userGuess === randomNumber) {
    gameSettings.totalPrize += currentPrize;
    if (
    confirm(`
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
       * I do not understand in task rules if I need to reset 
       * the data here { prize: 10,maxRangeValue: 5,totalPrize: 0} .
       */
    }
  }
  } while (playAgain);
}

function getRandomNumber(maxValue) {
  return Math.floor(Math.random() * ++maxValue);
}
