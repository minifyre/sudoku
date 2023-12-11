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

	find a stackoverflow-compatible license

UX
	ensure that the board has a unique solution so that [data-inccorect] does not cause issues if the user comes up with an alternative solution...

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
			<section class="board">
				{Array(currentBoard().length)
					.fill(1)
					.map((_, y) =>
						Array(currentBoard().length)
							.fill(1)
							.map((_, x) => (
								<input
									class="cell"
									data-blank={!!currentBoard()[y][x]}
									data-incorrect={
										currentBoard()[y][x] !== 0 &&
										currentBoard()[y][x] !== solvedBoard()[y][x]
									}
									data-x={x}
									data-y={y}
									disabled={!!initialBoard()[y][x]}
									onInput={event => {
										/** @note '' will return NaN, thus the zero guard */
										const newValue = event.currentTarget.valueAsNumber || 0

										const tmpBoard = clone(currentBoard())
										tmpBoard[y][x] = newValue
										setCurrentBoard(tmpBoard)
									}}
									min="0"
									max="9"
									{...(currentBoard()[y][x] ? {value: currentBoard()[y][x]} : {})}
									type="number"
								/>
							))
					)}
			</section>
		</>
	)
}

export default App
