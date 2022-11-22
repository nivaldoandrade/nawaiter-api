import { Request, Response } from 'express';
import { Product } from '../../models/Product';

import createProductService from '../../services/products/CreateProductService';
import showProductService from '../../services/products/ShowProductService';
import updateProductService from '../../services/products/UpdateProductService';
import deleteProductService from '../../services/products/DeleteProductService';

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

	public async update(request: Request, response: Response) {
		const { id } = request.params;
		const { name, description, price, ingredients, category } = request.body;

		const product = await updateProductService.execute({ id, name, description, price, ingredients, category });

		return response.status(200).json(product);
	}

	public async delete(request: Request, response: Response) {
		const { id } = request.params;

		await deleteProductService.execute(id);

		return response.status(204).json();
	}

}


export default ProductsController;
