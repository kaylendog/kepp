import { Document } from "mongoose";

/**
 * Util function to swap out "_id" for "id" and remove version revision entries.
 * @param doc The document to remove fields from
 */
export const removeFields = (doc: Document) => {
	const res = doc.toObject();

	if (res._id) {
		res.id = res._id;
		delete res._id;
	}

	delete res.__v;

	return doc;
};
