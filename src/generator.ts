export type IBoard = number[][]

const EMPTY_CELL = 0

const BASE = 3
const SIDE = BASE * BASE

const pattern = (r: number, c: number) => (BASE * (r % BASE) + Math.floor(r / BASE) + c) % SIDE
const shuffle = <T>(s: Array<T>) => s.sort(() => Math.random() - 0.5)

/** @note adapted from: https://stackoverflow.com/q/72891150 & https://www.codeconvert.ai/python-to-javascript-converter */
export const generateBoard = () => {
	const rows: number[] = []
	for (let g = 0; g < BASE; g++)
		for (let row of shuffle([...Array(BASE).keys()])) rows.push(g * BASE + row)

	const columns: number[] = []
	for (let g = 0; g < BASE; g++)
		for (let column of shuffle([...Array(BASE).keys()])) columns.push(g * BASE + column)

	const numbers = shuffle([...Array(BASE * BASE).keys()].map(x => x + 1))

	const board = rows.map(r => columns.map(c => numbers[pattern(r, c)]))
	const squares = SIDE * SIDE
	const empties = Math.floor((squares * 3) / 4)

	for (let p of shuffle([...Array(squares).keys()]).slice(0, empties))
		board[Math.floor(p / SIDE)][p % SIDE] = EMPTY_CELL

	return board
}
