export const getIndexesFromIndex = (index: number) => {
	const rowIndex = Math.floor(index / 9);
	const colIndex = index % 9;
	const houseIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);

	return {
		rowIndex,
		colIndex,
		houseIndex
	};
};
