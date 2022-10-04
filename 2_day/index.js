const input = require("./input.json");

const _testcases = 
	[ 
		"forward 5", 
		"down 5", 
		"forward 8", 
		"up 3", 
		"down 8", 
		"forward 2" 
	]


function getCoordinateOfSubmarine(coordinates){
	let [horizontal,depth] = [0,0];
	let aim = 0;

	function commandParser([command, step]){
		step = parseInt(step);
		switch(command) {
			case "forward":
				horizontal += step;
				break;
			case "down":
				depth += step;
				break;
			case "up":
				depth -= step;
				break;
		}
	}

	function newCommandParser([command, step]){
		step = parseInt(step);
		switch(command) {
			case "forward":
				horizontal += step;
				aim += depth * step;
				break;
			case "down":
				depth += step;
				break;
			case "up":
				depth -= step;
				break;
		}
	}

	// coordinates.map(item => commandParser(item.split(" ")))
	coordinates.map(item => newCommandParser(item.split(" ")))

	return [horizontal,aim]
}

function multiplier([hor, dep]) { return hor * dep;}

console.log(getCoordinateOfSubmarine(input))
console.log(multiplier(getCoordinateOfSubmarine(input)))
