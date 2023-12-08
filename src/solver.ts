export type IBoard = number[][]

/** @note code below adapted from  https://stackoverflow.com/a/55757694 */

export const isValid = (board: IBoard, row: number, col: number, k: number) => {
	for (let i = 0; i < 9; i++) {
		const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
		const n = 3 * Math.floor(col / 3) + (i % 3)
		if (board[row][i] === k || board[i][col] === k || board[m][n] === k) return false
	}
	return true
}

export const sudokoSolver = (board: IBoard) => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] === 0) {
				for (let k = 1; k <= 9; k++) {
					if (isValid(board, i, j, k)) {
						board[i][j] = k
						if (sudokoSolver(board)) return true
						else board[i][j] = 0
					}
				}
				return false
			}
		}
	}
	return true
}
