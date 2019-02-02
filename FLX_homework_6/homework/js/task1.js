const paramArray = [];
paramArray.push(parseFloat(prompt('Please enter value of A', '0')));
paramArray.push(parseFloat(prompt('Please enter value of B', '0')));
paramArray.push(parseFloat(prompt('Please enter value of C', '0')));
let output;
let discriminant;

if (isNaN(...paramArray)) {
  output = 'Invalid input data';
} else {
  const [a, b, c] = paramArray;
  discriminant = b * b - 4 * a * c;

  if (discriminant === 0) {
    let x = -b / (2 * a);
    output = `x = ${+x.toFixed(2)}`;
  } else if (discriminant > 0) {
    let x1 = (-1 * b + Math.sqrt(discriminant)) / (2 * a);
    let x2 = (-1 * b - Math.sqrt(discriminant)) / (2 * a);
    output = `x1 = ${+x1.toFixed(2)} and x2 = ${+x2.toFixed(2)}`;
  } else {
    output = 'no solution';
  }
}
alert(output);
