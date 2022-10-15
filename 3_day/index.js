const data = require('./input.json');

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


const dominated_bit_by_count = (count,length,result) => {
	if (count > length/2) {
		return [result[0].concat('1'), result[1].concat('0')];
	}

	return [result[0].concat('0'), result[1].concat('1')];
}

const part_1 = (input) => {
	const counters = Array(input[0].length).fill(0)

	input.map(item => {
		[...item].map((item,idx) => {
			item === '1' && counters[idx]++;
		});
	})

	const result = counters.reduce((result,count) => {
		return dominated_bit_by_count(count,input.length,result);
	},Array(2).fill('0b')) 

	const [gammaRate, epsilonRate] = result.map(item => Number(item));

	console.log(`soluton of part 1 is '${gammaRate * epsilonRate}'`);
}

const part_2 = (input) => {
	[oxygen_generator_rates, co2_scrubber_rates] = input.reduce((arr,item) => { 
		item[0] === '1' ? arr[0].push(item) : arr[1].push(item); 
		return arr; 
	}, [[],[]]);

	if(co2_scrubber_rates.length > oxygen_generator_rates.length) {
		[oxygen_generator_rates, co2_scrubber_rates] = [co2_scrubber_rates, oxygen_generator_rates];
	}


	for (let idx = 1; oxygen_generator_rates.length !== 1; ++idx){
		let temp = oxygen_generator_rates.reduce((arr,item) => {
			item[idx] === '1' ? arr[0].push(item):arr[1].push(item);
			return arr;
		}, [[],[]]);

		oxygen_generator_rates = temp[0].length >= temp[1].length ? temp[0]:temp[1];
	}

	for (let idx = 1; co2_scrubber_rates.length !== 1; ++idx){
		let temp = co2_scrubber_rates.reduce((arr,item) => {
			item[idx] === '0' ? arr[0].push(item):arr[1].push(item);
			return arr;
		}, [[],[]]);

		co2_scrubber_rates = temp[0].length <= temp[1].length ? temp[0]:temp[1];
	}

	console.log(`solution of part 2 is '${Number('0b' + oxygen_generator_rates[0]) * Number('0b' + co2_scrubber_rates[0])}'`)
}

part_1(data);
part_2(data);
