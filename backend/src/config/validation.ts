interface Object {
	[x: string]:
		| StringConstructor
		| ArrayConstructor
		| NumberConstructor
		| BooleanConstructor
		| ObjectConstructor;
}

export type ObjectFromSchema<T extends Object> = {
	[P in keyof T]: ReturnType<T[P]>;
};

interface SchemaValidation<T> {
	missingEntries: (keyof T)[];
	invalidTypes: (keyof T)[];
	valid: boolean;
}

/**
 * Check that the provided object values matches the given schema.
 * @param schema
 * @param obj
 */
export const validateObject = <T extends any>(
	schema: T,
	obj: { [x: string]: any },
): SchemaValidation<T> => {
	let validation: SchemaValidation<T> = {
		missingEntries: [],
		invalidTypes: [],
		valid: true,
	};

	Object.entries(schema).forEach((entry) => {
		if (typeof obj[entry[0]] !== typeof entry[1]()) {
			validation.invalidTypes.push(entry[0]);
		}

		if (typeof obj[entry[0]] == "undefined") {
			validation.missingEntries.push(entry[0]);
		}

		validation.valid =
			validation.missingEntries.length === 0 &&
			validation.invalidTypes.length === 0;
	});

	return validation;
};
