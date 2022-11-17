import { Request, Response } from 'express';
import { Product } from '../../models/Product';

import createProductService from '../../services/products/CreateProductService';
import showProductService from '../../services/products/ShowProductService';

class ProductsController {

	public async list(request: Request, response: Response) {
		const products = await Product.find();


		return response.status(200).json(products);
	}

	public async show(request: Request, response: Response) {
		const { id } = request.params;

		const product = await showProductService.execute(id);

		return response.status(200).json(product);
	}

	public async create(request: Request, response: Response) {
		const { name, description, price, ingredients, category } = request.body;
		const imagePath = request.file?.filename;

		const product = await createProductService.execute({ name, description, imagePath, price, ingredients, category });

		return response.status(201).json(product);
	}
}


export default ProductsController;
