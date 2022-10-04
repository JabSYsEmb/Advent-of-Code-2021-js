const input = require("./input.json");

const _arr = [ 199,  200,  208,  210,  200,  207,  240,  269,  260,  263 ]

function howManyIncreas(arr){
	let counter = 0;
	arr.reduce((prev,curr) => { 
		if(curr > prev) { counter++; } 
		return curr; 
	})
	return counter;
}


function howManyIncreaseInEachWindow(arr){
	// window contains of three measurement in row
	
	let counter = 0;

	function returnSumOfArr(sum,item) {
		sum += item;
		return sum;
	}

	function shiftIdxByThree(idx) {
		return [idx,idx+3];
	}


	let idx = 0;
	while(arr.length-3  >= idx){
		let sum_a = arr.slice(...shiftIdxByThree(idx)).reduce(returnSumOfArr,0); 
		let sum_b = arr.slice(...shiftIdxByThree(idx+1)).reduce(returnSumOfArr,0);
		if(sum_a < sum_b) counter++
		idx += 1;
	}
	return counter;
}

howManyIncreaseInEachWindow(_arr);
