const max = process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let number = 1;

    return {
      next() {
        if (number > max) {
          return { done: true };
        }

        let value = number++;

        if (value % 15 === 0) {
          value = 'FizzBuzz';
        } else if (value % 3 === 0) {
          value = 'Fizz';
        } else if (value % 5 === 0) {
          value = 'Buzz';
        }

        return { done: false, value };
      }
    };
  }
};

for (var n of FizzBuzz) {
  console.log(n);
}