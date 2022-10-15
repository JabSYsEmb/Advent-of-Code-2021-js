const data = require("./input.json");

const test = 
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

const part_1 = (input) => {
	const counters = Array(input[0].length).fill(0)

	input.map(item => {
		[...item].map((item,idx) => {
			item === '1' && counters[idx]++;
		});
	})

	const result = counters.reduce((result,item) => {
		return item > input.length/2 ? [result[0].concat('1'),result[1].concat('0')]: [result[0].concat('0'),result[1].concat('1')];
	},Array(2).fill('0b'))

	const solution = result.map(item => Number(item)).reduce((multiply,item) => multiply*item ,1);

	console.log(`soluton of part 1 is '${solution}'`);
}

part_1(data)
