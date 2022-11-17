import { isValidObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';

class ShowProductService {

	public async execute(id: string) {
		if (!isValidObjectId(id)) {
			throw new AppError('CategoryId is invalid');
		}

		const product = await Product.findById(id);

		if (!product) {
			throw new AppError('Product not found', 404);
		}

		return product;
	}
}

export default new ShowProductService();
