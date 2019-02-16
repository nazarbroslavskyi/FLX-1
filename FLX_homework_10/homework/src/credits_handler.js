function userCard (index) {
  let cardOptions = {
    key: index,
    balance: 100,
    transactionLimit: 100 
  };
  let historyLog = [];
  const TAX = 0.005;
  const errorTemplate = `
  Transfer error! Please check balance: ${cardOptions.balance} and transaction limit: ${cardOptions.transactionLimit}
  `;
  let date = new Date().toLocaleString('en-GB');

  function historyLogChange (operationType, amount, date) {
    historyLog.push({
      operationType: operationType,
      credits: amount,
      operationTime: date
    });
  }

  function validInput (amount) {
    return !isNaN(+parseFloat(amount)) ? +parseFloat(amount) : false;
  }

  return {
    getCardOptions: function () {
      return Object.assign(cardOptions, { historyLogs: historyLog });
    },

    putCredits: function (amount) {
      let validAmount = validInput(amount);

      if (validAmount) {
        cardOptions.balance += amount;
        historyLogChange('Received credits', amount, date);
      }
    },

    setTransactionLimit: function (amount) {
      let validAmount = validInput(amount);

      if (validAmount) {
        cardOptions.transactionLimit = validAmount;
        historyLogChange('Transaction limit change', validAmount, date);
      }
    },

    takeCredits : function (amount) {
      let validAmount = validInput(amount);

      if (validAmount) {
        if (validAmount <= cardOptions.balance && validAmount <= cardOptions.transactionLimit) {
          cardOptions.balance -= validAmount;
          historyLogChange('Withdrawal of credits', validAmount, date);
        } else {
          console.log(errorTemplate);
        }
      }
    },

    transferCredits: function (amount, receiver) {
      let validAmount = validInput(amount);

      if (validAmount) {
        let amountWithTax = TAX * validAmount + validAmount;
        if (amountWithTax <= cardOptions.balance && amountWithTax <= cardOptions.transactionLimit) {
          receiver.putCredits(validAmount);
          this.takeCredits(amountWithTax);
        } else {
          console.log(errorTemplate);
        }
      }
    }
  }
}

class UserAccount {
  constructor (name) {
    this.name = name;
    this.cards = [];
    this.MAX_CARDS = 3;
  }

  addCard () {
    if (this.cards.length < this.MAX_CARDS) {

      /**
       * Some bug with eslint, cant invoke UserCard constructor with uppercase
       * so i should to rename UserCard -> userCard, but it is a bad practice of naming:C
       */
      this.cards.push(userCard(this.cards.length + 1));
    } else {
      console.log(`Error: You've reached maximum amount of cards!`);
    }
  }

  getCardByKey (key) {
    return this.cards[key - 1];
  }
}
