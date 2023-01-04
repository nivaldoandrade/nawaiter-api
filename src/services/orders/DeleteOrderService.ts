import { isValidObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Order } from '../../models/Order';

class DeleteOrderService {

	public async execute(orderId: string) {
		if (!isValidObjectId(orderId)) {
			throw new AppError('Id is invalid');
		}

		const order = await Order.findByIdAndDelete(orderId);

		if (!order) {
			throw new AppError('Order is not found', 404);
		}
	}
}

export default new DeleteOrderService();
