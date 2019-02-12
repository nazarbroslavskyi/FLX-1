function reverseNumber (argA){
	let negativeArg = false;
	if(argA < 0) {
		negativeArg = true;
	}
	argA = Math.abs(argA) + '';
	if(negativeArg) {
		return -argA.split('').reverse().join('');
	}
	return +argA.split('').reverse().join('');
}

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);
