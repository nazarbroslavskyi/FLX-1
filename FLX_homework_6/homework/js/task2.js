const amount = parseFloat(prompt('Please enter amount of money', '0'));
const discount = parseFloat(prompt('Please enter discount', '0'));
const maxAmount = 9999999;
const maxDiscount = 99;
let output;

if (validateInput(amount) || validateInput(discount) || discount > maxDiscount || amount >= maxAmount) {
  output = 'Invalid input data';
} else {
  /**
   * Discount = 0, amount = 0 also work! 
   * It seems strange, but in the task - range of inputs discount[0,99] and amount[0,9999999].
   */
  let saved = amount / 100 * discount;
  let priceWithDiscount = amount - saved;
  output = `
  Price without discount: ${+amount.toFixed(2)}
  Discount: ${+discount.toFixed(2)}%
  Price with discount: ${+priceWithDiscount.toFixed(2)}
  Saved: ${+saved.toFixed(2)}
  `;
}

function validateInput (inputData) {
  return isNaN(inputData) || inputData < 0;
}

alert(output);
