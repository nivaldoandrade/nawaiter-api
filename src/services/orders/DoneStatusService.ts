import { isValidObjectId } from 'mongoose';

import { Order } from '../../models/Order';

import AppError from '../../errors/AppError';


class DoneStatusService {

	public async execute(id: string) {

		if (!isValidObjectId(id)) {
			throw new AppError('OrderId is invalid');
		}

		const updatedOrder = await Order.findById(id);

		if (updatedOrder?.status === 'DONE') {
			throw new AppError('The order is already in done');
		}

		if (!updatedOrder) {
			throw new AppError('Order is not found', 404);
		}

		await Order.updateOne({ _id: updatedOrder.id }, { status: 'DONE' });

	}
}

export default new DoneStatusService();
