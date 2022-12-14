import { ObjectId } from 'mongoose';

import { io } from '../../index';

import { Order } from '../../models/Order';

import AppError from '../../errors/AppError';

interface IRequest {
	table: string;
	products: IProduct[];
}

interface IProduct {
	product: {
		id: ObjectId
	},
	quantity?: number;
}


class CreateOrderService {
	public async execute({ table, products }: IRequest) {
		if (!table) {
			throw new AppError('Table is required');
		}

		if (!products || products.length < 1) {
			throw new AppError('The order must have at least one product');
		}

		const order = await (await Order.create({ table, products })).populate('products.product');

		io.emit('newOrder', order);

		return order;
	}
}

export default new CreateOrderService();
