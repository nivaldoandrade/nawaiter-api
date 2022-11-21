import { ObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';

interface IRequest {
	id: string;
	name: string;
	description?: string;
	price: string;
	ingredients: string;
	category: ObjectId;
}

interface IIngredients {
	name: string;
	icon: string;
}

class UpdateProductService {


	public async execute({ id, name, description, price, ingredients, category }: IRequest) {

		if (!name) {
			throw new AppError('Name is required');
		}

		if (!price) {
			throw new AppError('Price is required');
		}

		if (!category) {
			throw new AppError('Category is required');
		}

		const ingredientsParsed: IIngredients[] = JSON.parse(ingredients);

		ingredientsParsed.forEach(ingredient => {
			if (!ingredient.name) {
				throw new AppError('Ingredient name is required');
			}
		});


		const product = await Product.findByIdAndUpdate(id, { name, description, price, ingredientsParsed: ingredients, category }, { new: true });

		if (!product) {
			throw new AppError('Product is not found', 404);
		}

		return product;

	}
}

export default new UpdateProductService();
