import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: Date,
});

export default model('User', UserSchema);
