import { writable } from 'svelte/store';

type Actives = {
	value: string;
	index: number;
	row: number;
	col: number;
	house: number;
	autoCandidate: boolean;
};
export const actives = writable<Actives>({
	value: '-1',
	index: -1,
	row: -1,
	col: -1,
	house: -1,
	autoCandidate: false
});
