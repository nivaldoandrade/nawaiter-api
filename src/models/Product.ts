import mongoose from 'mongoose';


const schema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	description: {
		type: String
	},
	imagePath: {
		type: String
	},
	price: {
		required: true,
		type: Number
	},
	ingredients: [
		{
			icon: {
				type: String
			},
			name: {
				required: true,
				type: String
			}
		}
	],
	category: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Category',
		required: true
	}
});

export const Product = mongoose.model('Product', schema, 'products');
