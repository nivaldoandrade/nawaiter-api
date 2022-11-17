import { ObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';

interface IRequest {
	name: string;
	description?: string;
	imagePath?: string;
	price: string;
	ingredients: string;
	category: ObjectId;
}

interface IIngredients {
	name: string;
	icon: string;
}

class CreateProductService {


	public async execute({ name, description, imagePath, price, ingredients, category }: IRequest) {

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


		const product = await Product.create({ name, description, imagePath, price, ingredients: ingredientsParsed, category });

		return product;

	}
}

export default new CreateProductService();
