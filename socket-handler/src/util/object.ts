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
