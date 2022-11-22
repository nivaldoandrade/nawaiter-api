import { isValidObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';
import { deleteFile } from '../../utils/deleteFile';


class DeleteProductService {

	public async execute(id: string) {
		if (!isValidObjectId(id)) {
			throw new AppError('ProductID is invalid');
		}

		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			throw new AppError('Product is not found', 404);
		}

		if (product.imagePath) {
			deleteFile(product.imagePath);
		}

	}
}

export default new DeleteProductService();
