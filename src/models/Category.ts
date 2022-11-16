import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	icon: {
		required: true,
		type: String
	}
});


export const Category = mongoose.model('Category', schema);
