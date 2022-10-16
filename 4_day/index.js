#!/usr/bin/env node

const fs = require('fs');
const sample = require('./sample.js');

const filename = 'input.txt'
const file = fs.readFileSync(filename).toString('utf8')

const init_bingo_board = (data) => {
	const [board, ...rest] = data.split(/\n\n/);
	return {
		board: board.split(/,/).map(num => parseInt(num)),
		hands: parse_hands(rest.map(item => item.split(/\n/))),
		logger: item => console.log(item),
		last_drawn: 0,
		draw: function(cards=1) { 
			if(cards <= 0) 
				throw `\x1b[31mEnter a valid number to cards to be drawn\x1b[0m`;

			if(cards > this.board.length) 
				throw `\x1b[31mYou are trying to draw ${cards} cards but there are just ${this.board.length} cards in the deck\x1b[0m`;

			if(cards === 1) {
				this.last_drawn = this.board.shift();
				this.search_hands();
				return this.last_drawn;
			}
			let temp = [];
			for(let i=0; i < cards; ++i){ 
				this.last_drawn = this.board.shift();
				this.search_hands();
				temp.push(this.last_drawn);
			}
			return temp;
		},
		search_hands: function() {

			for (let hand_idx in this.hands) {
				for (let row_idx in this.hands[hand_idx]){
					for (let item in this.hands[hand_idx][row_idx]){
						if(this.hands[hand_idx][row_idx][item] === this.last_drawn){
							this.hands[hand_idx][row_idx][item] = NaN;
						}
					}
				}
			}
		}
	}
}

const parse_hands = (hands) => hands.map(hand => hand.map(split_lines))

const split_lines = (lines) => 
	lines.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num));

// const game_board = init_bingo_board(sample.sample_part_1.input);
const game_board = init_bingo_board(file);

console.log(game_board);
console.log(`drawn card is ${game_board.draw(12)}`);
console.log(game_board.hands);

