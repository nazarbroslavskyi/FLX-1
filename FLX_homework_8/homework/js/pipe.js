function pipe (value) {
	for (let i = 1; i < arguments.length; i++) {
		value = arguments[i](value);
	}
	
	return value;
}

function addOne(x) {
  return x + 1;
}

pipe(1, addOne);
pipe(1, addOne, addOne);
