let inputs = process.argv.slice(2);
let result = inputs.map(input => input[0].toUpperCase())
  .reduce((previous, current) => previous + current);
  
console.log(result);