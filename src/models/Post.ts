import { Schema, model } from 'mongoose';
import { timeStamp } from 'console';

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		content: {
			type: String,
			required: true,
		},
		image: String,
	},
	{ timestamps: true }
);

export default model('Post', PostSchema);
