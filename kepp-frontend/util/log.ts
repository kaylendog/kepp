/**
 * Pretty logging function.
 * @param msg
 * @returns
 */
export const log = (...msg: unknown[]) => console.log(...msg);

export const categoryLog = (category: string, ...msg: unknown[]) =>
	log(
		`%c[%c${category}%c]%c`,
		"color: gray;",
		"color: white; font-weight: bold",
		"color: gray; font-weight: initial;",
		"color: initial;",
		...msg
	);
