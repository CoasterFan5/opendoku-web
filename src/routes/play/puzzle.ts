import { getIndexesFromIndex } from './getIndexesFromIndex';

export class Puzzle {
	private puzzleNumbers: number[] = [];
	private rowInvalids: number[][] = [];
	private colInvalids: number[][] = [];
	private houseInvalids: number[][] = [];

	constructor() {
		this.puzzleNumbers = new Array(81).fill(0);
		this.rowInvalids = Array.from({ length: 9 }, () => [] as number[]);
		this.colInvalids = Array.from({ length: 9 }, () => [] as number[]);
		this.houseInvalids = Array.from({ length: 9 }, () => [] as number[]);
	}

	setValue(index: number, value: number): boolean {
		const { rowIndex, colIndex, houseIndex } = getIndexesFromIndex(index);

		if (value !== 0) {
			if (this.rowInvalids[rowIndex].includes(value)) {
				return false;
			}
			if (this.colInvalids[colIndex].includes(value)) {
				return false;
			}
			if (this.houseInvalids[houseIndex].includes(value)) {
				return false;
			}
		}

		const oldValue = this.puzzleNumbers[index];
		this.rowInvalids[rowIndex] = this.rowInvalids[rowIndex].filter((v) => v != oldValue);
		this.colInvalids[colIndex] = this.colInvalids[colIndex].filter((v) => v != oldValue);
		this.houseInvalids[houseIndex] = this.houseInvalids[houseIndex].filter((v) => v != oldValue);

		this.puzzleNumbers[index] = value;
		this.rowInvalids[rowIndex].push(value);
		this.colInvalids[colIndex].push(value);
		this.houseInvalids[houseIndex].push(value);

		return true;
	}

	getCandidates(index: number) {
		const { rowIndex, colIndex, houseIndex } = getIndexesFromIndex(index);
		const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const realCandidates = [];

		for (const item of candidates) {
			if (this.rowInvalids[rowIndex].includes(item)) {
				realCandidates.push(0);
				continue;
			}
			if (this.colInvalids[colIndex].includes(item)) {
				realCandidates.push(0);
				continue;
			}
			if (this.houseInvalids[houseIndex].includes(item)) {
				realCandidates.push(0);
				continue;
			}
			realCandidates.push(item);
		}
		return realCandidates;
	}
}
