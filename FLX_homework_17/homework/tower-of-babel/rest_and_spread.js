var rawArgs = process.argv.slice(2);
var args = [];

rawArgs.forEach(val => {
  let commaSep = val.split(',');
  commaSep.forEach(val => {
    if (val !== '') args.push(+val);
  });
});

let average = (...args) => {
  return args.reduce((sum, n) => sum + n) / args.length;
}

console.log(avg(...args));