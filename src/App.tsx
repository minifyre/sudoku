import {createSignal} from 'solid-js'
import './App.css'

import {generateBoard} from './generator'
import {sudokoSolver} from './solver'

/**
figure out how to store sodoku state
	eliminate clues & check uniqueness
	difficulty options
UI
	URL 2 board
	mobile keypad buttons
	notes
	options
		tell me if I'm wrong

 */

const App = () => {
	const [board, setBoard] = createSignal(generateBoard())

	const start = Date.now()

	if (sudokoSolver(board())) console.log(`Solved in ${Date.now() - start}`)
	else throw `Invalid Board: ${JSON.stringify(board())}`

	console.log(board())

	return (
		<>
			<table>
				{Array(board().length)
					.fill(1)
					.map((_, y) => (
						<tr>
							{Array(board().length)
								.fill(1)
								.map((_, x) => (
									<td>{board()[y][x]}</td>
								))}
						</tr>
					))}
			</table>

			{/* <button onClick={() => setBoard(count => count + 1)}>count is {board()}</button> */}
		</>
	)
}

export default App
