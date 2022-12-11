import { isValidObjectId } from 'mongoose';

import { Order } from '../../models/Order';

import AppError from '../../errors/AppError';


class ShowOrderService {

	public async execute(id: string) {
		if (!isValidObjectId(id)) {
			throw new AppError('OrderId is invalid');
		}

		const order = await Order.findById(id);

		if (!order) {
			throw new AppError('OrderId is not found', 404);
		}

		return order;
	}
}

export default new ShowOrderService();
