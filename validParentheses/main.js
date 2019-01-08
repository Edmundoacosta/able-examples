function isBalance(string) {
	var expression = string.split('');
	let counter = 0;
	for (var i = 0; i < expression.length; i++) {
		if (expression[i] == '(') counter++;
		else if (expression[i] == ')') counter--;
	}
	return counter==0?true: false;
}

console.log(isBalance('()()()()()()()()()()()()()'));
console.log(isBalance('()()(()())()()()()()()()()()()'));
console.log(isBalance('()()()()()()()()()()()()()'));
console.log(isBalance('()()()()((((()))))()()()()()()()())))))'));
console.log(isBalance('()()()()())))(()()()()()()()()'));
