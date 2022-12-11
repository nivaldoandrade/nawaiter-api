import mongoose from 'mongoose';


const schema = new mongoose.Schema({
	table: {
		required: true,
		type: String
	},
	status: {
		type: String,
		enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
		default: 'WAITING'
	},
	products: {
		required: true,
		type: [{
			product: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				default: 1,
			}
		}]
	}
});

schema.set('timestamps', true);

export const Order = mongoose.model('Order', schema, 'orders');


