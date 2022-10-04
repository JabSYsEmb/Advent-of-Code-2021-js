const data = require("./input.json");

const _testcase = 
	[
		"00100",
		"11110",
		"10110",
		"10111",
		"10101",
		"01111",
		"00111",
		"11100",
		"10000",
		"11001",
		"00010",
		"01010"
	]

const getGammaAndEpsilonRate = (arr) => {
	let [gamma,epsilon] = ['0b','0b'];

	const sum = Array(arr[0].length).fill(0);

	arr.map(item => {
		[...item].map((item,idx)=> {
			if(item === '1'){
				sum[idx] += 1;
			}
		})
	})

	sum.map(item => {
		if(item > arr.length/2) {
			gamma += '1';
			epsilon += '0';
			return;
		}
		epsilon += '1';
		gamma += '0';
	})

	return [gamma,epsilon]
}

const convertStringArrayIntoNumberArray = (str_arr) => str_arr.map(str => Number(str));

const multiplyTwoNumber = ([num_1,num_2]) => num_1 * num_2;

console.log(multiplyTwoNumber(convertStringArrayIntoNumberArray(getGammaAndEpsilonRate(data))));

