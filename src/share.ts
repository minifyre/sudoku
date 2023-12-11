import {IBoard} from './generator'
import {int2urlParam} from './urlBoards'

const emojis: Record<number, string> = {
	0: '0️⃣',
	1: '1️⃣',
	2: '2️⃣',
	3: '3️⃣',
	4: '4️⃣',
	5: '5️⃣',
	6: '6️⃣',
	7: '7️⃣',
	8: '8️⃣',
	9: '9️⃣',
}

export const shareText = (initialBoard: IBoard) => {
	const urlParam = int2urlParam(parseInt(initialBoard.flat().join('')))

	const emojiBoard = initialBoard
		.map(
			(row, y) =>
				/** @note convert values to emojis & insert box separators */
				row.map((value, x) => emojis[value] + (x === 2 || x === 5 ? ' ' : '')).join('') +
				(y === 2 || y === 5 ? '\n' : '')
		)
		.join('\n')

	return `minify.re/sudoku?b=${urlParam} \n\n${emojiBoard}`
}

export const board2twitterUrl = (initialBoard: IBoard) =>
	`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText(initialBoard))}`
