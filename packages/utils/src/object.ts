/**
 * Flatten an object into key-value pairs.
 * @param obj
 */
export const flatten = (obj: { [x: string]: any }) => {
	const res: { [x: string]: any } = {};

	for (const i in obj) {
		if (!obj.hasOwnProperty(i)) {
			continue;
		}

		if (typeof obj[i] == 'object' && obj[i] !== null) {
			const flatObject = flatten(obj[i]);

			for (const prop in flatObject) {
				if (!flatObject.hasOwnProperty(prop)) {
					continue;
				}

				res[`${i}.${prop}`] = flatObject[prop];
			}
		} else {
			res[i] = obj[i];
		}
	}
	return res;
};

/**
 * Convert an object's keys and any sub-objects' keys into camelCase.
 * @param obj
 */
export const camelCaseify = (obj: any) => {
	if (typeof obj !== 'object') {
		throw TypeError('"camelCaseify" can only be used on objects.');
	}

	let res: { [x: string]: any } = {};

	for (const prop in obj) {
		if (!obj.hasOwnProperty(prop)) {
			continue;
		}

		if (typeof obj[prop] === 'object' && obj[prop] !== null) {
			res = { ...res, ...flatten(obj[prop]) };
		}
	}
};
