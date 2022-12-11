import { isValidObjectId, ObjectId } from 'mongoose';

import { Order } from '../../models/Order';

import AppError from '../../errors/AppError';


interface IRequest {
	id: string,
	table: string;
	products: IProduct[];
}

interface IProduct {
	product: {
		id: ObjectId
	},
	quantity?: number;
}

class UpdateOrderService {

	public async execute({ id, table, products }: IRequest) {
		if (!isValidObjectId(id)) {
			throw new AppError('Id is invalid');
		}

		if (!table) {
			throw new AppError('Table is required');
		}

		if (!products || products.length < 1) {
			throw new AppError('The order must have at least one product');
		}

		const order = await Order.findByIdAndUpdate(id, { table, products }, { new: true });

		if (!order) {
			throw new AppError('OrderId is not found', 404);
		}

		return order;
	}
}


export default new UpdateOrderService();
