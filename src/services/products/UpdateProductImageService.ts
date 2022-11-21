import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';
import { deleteFile } from '../../utils/deleteFile';



interface IRequest {
	id: string;
	imagePath?: string;
}


class UpdateProductImageService {


	public async execute({ id, imagePath }: IRequest) {
		if (!imagePath) {
			throw new AppError('Image is required');
		}

		const product = await Product.findByIdAndUpdate(id, { imagePath });

		if (!product) {
			throw new AppError('Product is not found', 404);
		}

		if (product.imagePath) {
			deleteFile(product.imagePath);
		}

		product.imagePath = imagePath;

		return product;
	}
}

export default new UpdateProductImageService();
