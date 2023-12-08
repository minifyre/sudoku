/* @refresh reload */
import {render} from 'solid-js/web'

import './index.css'
import App from './App'
import {sudokoSolver} from './solver'

const root = document.getElementById('root')

/**
figure out how to store sodoku state
generator
	random shuffle
	check validity
	eliminate clues & check uniqueness
	difficulty options
UI
	display board via URL
	mobile keypad buttons
	notes
	options
		tell me if I'm wrong

 */

type IBoard = number[][]

const board: IBoard = [
	[0, 9, 0, 0, 4, 2, 1, 3, 6],
	[0, 0, 0, 9, 6, 0, 4, 8, 5],
	[0, 0, 0, 5, 8, 1, 0, 0, 0],
	[0, 0, 4, 0, 0, 0, 0, 0, 0],
	[5, 1, 7, 2, 0, 0, 9, 0, 0],
	[6, 0, 2, 0, 0, 0, 3, 7, 0],
	[1, 0, 0, 8, 0, 4, 0, 2, 0],
	[7, 0, 6, 0, 0, 0, 8, 1, 0],
	[3, 0, 0, 0, 9, 0, 0, 0, 0],
]

render(() => <App />, root!)
