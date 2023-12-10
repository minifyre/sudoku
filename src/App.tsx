import {createSignal} from 'solid-js'
import './App.css'

import {generateBoard} from './generator'
import {sudokoSolver} from './solver'

/**
figure out how to store sodoku state
	check solution uniqueness
	difficulty options (i.e., `generateBoard(unfilledCellTotal)` minimum of 16)
UI
	URL 2 board
	mobile keypad buttons
	notes (transparent text input that changes the background--SVG sprites?)
	options
		tell me if I'm wrong (color red/shade the background a bit for colorblind people?)

 */

const clone = <T,>(json: T): T => JSON.parse(JSON.stringify(json))

const App = () => {
	const [currentBoard, setCurrentBoard] = createSignal(generateBoard())
	const [initialBoard] = createSignal(clone(currentBoard()))

	/** @todo figure out how to store the solved board if sudokoSolver mutates the orginal... */

	const start = Date.now()
	const test = clone(currentBoard())
	sudokoSolver(test)
	const [solvedBoard, setSolvedBoard] = createSignal(test)

	if (sudokoSolver(clone(currentBoard()))) console.log(`Solved in ${Date.now() - start}`)
	else throw `Invalid Board: ${JSON.stringify(currentBoard())}`

	return (
		<>
			<table class="board">
				{Array(currentBoard().length)
					.fill(1)
					.map((_, y) => (
						<tr>
							{Array(currentBoard().length)
								.fill(1)
								.map((_, x) => (
									<td data-visible={!!currentBoard()[y][x]}>
										{!!initialBoard()[y][x] ? (
											currentBoard()[y][x]
										) : (
											<input
												onInput={event => {
													/** @note '' will return NaN, thus the zero guard */
													const newValue =
														event.currentTarget.valueAsNumber || 0

													const tmpBoard = clone(currentBoard())
													tmpBoard[y][x] = newValue
													setCurrentBoard(tmpBoard)
												}}
												min="0"
												max="9"
												{...(currentBoard()[y][x]
													? {value: currentBoard()[y][x]}
													: {})}
												type="number"
											/>
										)}
									</td>
								))}
						</tr>
					))}
			</table>
		</>
	)
}

export default App
