/** @note adapted from: https://stackoverflow.com/a/6573119/2559304 */

const RIXITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'
const BASE = RIXITS.length

export const int2urlParam = (integer: number) => {
	if (integer < 0) throw `Integer "${integer}" is negative`
	let integer2 = integer
	let result = ''

	while (!!integer2) {
		let rixit = integer2 % BASE // like 'digit', only in some non-decimal radix
		result = RIXITS[rixit] + result
		integer2 = Math.floor(integer2 / BASE)
	}
	return result
}

export const urlParam2int = (rixits: string) =>
	rixits.split('').reduce((result2, _, e) => result2 * BASE + RIXITS.indexOf(rixits[e]), 0)
