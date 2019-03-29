const max = process.argv[2];
let FizzBuzz = function* () {
  let number = 1;

  while (number <= max) {
    let value = i;
    if (value % 15 === 0) {
      value = 'FizzBuzz';
    } else if (value % 3 === 0) {
      value = 'Fizz';
    } else if (value % 5 === 0) {
      value = 'Buzz';
    }

    number++;
    yield value;
  }
}();

for (let n of FizzBuzz) {
  console.log(n);
}