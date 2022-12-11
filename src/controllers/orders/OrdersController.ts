import { Request, Response } from 'express';

import { Order } from '../../models/Order';

import createOrderService from '../../services/orders/CreateOrderService';
import updateOrderService from '../../services/orders/UpdateOrderService';
import showOrderService from '../../services/orders/ShowOrderService';
import productionStatusService from '../../services/orders/ProductionStatusService';
import doneStatusService from '../../services/orders/DoneStatusService';

class OrdersController {

	public async list(request: Request, response: Response) {
		const orders = await Order.find();

		return response.json(orders);
	}

	public async show(request: Request, response: Response) {
		const { id } = request.params;

		const result = await showOrderService.execute(id);

		return response.json(result);
	}

	public async create(request: Request, response: Response) {
		const { table, products } = request.body;

		const result = await createOrderService.execute({ table, products });

		return response.status(201).json(result);
	}

	public async update(request: Request, response: Response) {
		const { table, products } = request.body;
		const { id } = request.params;

		const result = await updateOrderService.execute({ id, table, products });

		return response.json(result);
	}

	public async productionStatus(request: Request, response: Response) {
		const { id } = request.params;


		await productionStatusService.execute(id);

		return response.json();
	}

	public async doneStatus(request: Request, response: Response) {
		const { id } = request.params;

		await doneStatusService.execute(id);

		return response.json();
	}

}

export default OrdersController;
