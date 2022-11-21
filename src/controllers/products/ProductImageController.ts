import { Request, Response } from 'express';

import updateProductImageService from '../../services/products/UpdateProductImageService';


class ProductImageController {

	public async update(request: Request, response: Response) {
		const { id } = request.params;
		const imagePath = request.file?.filename;

		const product = await updateProductImageService.execute({ id, imagePath });

		return response.status(200).json(product);

	}

}

export default ProductImageController;
