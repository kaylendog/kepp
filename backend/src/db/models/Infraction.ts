import { Document, model, Schema } from "mongoose";

export interface Infraction extends Document {
	_id: string;

	guild_id: string;
	mod_id: string;
	user_id: string;

	channel_id: string;
	muted_channel_id: string;

	log_channel_id: string;
	log_message_id: string;

	active: boolean;
	deleted: boolean;
	muted: boolean;

	start_time: number;
	end_time: number;

	reason: string;
}

const InfractionSchema: Schema = new Schema(
	{
		_id: { type: String, required: true },

		guild_id: { type: String, required: true },
		mod_id: { type: String, required: true },
		user_id: { type: String, required: true },

		channel_id: { type: String, required: true },
		muted_channel_id: { type: String, required: true },

		log_channel_id: { type: String, required: true },
		log_message_id: { type: String, required: true },

		active: { type: Boolean, required: true },
		deleted: { type: Boolean, required: true },
		muted: { type: Boolean, required: true },

		start_time: { type: Number, required: true },
		end_time: { type: Number, required: true },

		reason: { type: String, required: true },
	},
	{ versionKey: false },
);

// Export the model and return your Infraction interface
export const InfractionModel = model<Infraction>(
	"Infraction",
	InfractionSchema,
	"mod_log",
);
