import { isValidObjectId } from 'mongoose';

import { Product } from '../../models/Product';
import { Category } from '../../models/Category';

import AppError from '../../errors/AppError';


class ListProductsByCategoryService {


	public async execute(categoryId: string) {
		if (!isValidObjectId(categoryId)) {
			throw new AppError('CategoryId is invalid');
		}

		const category = await Category.findById(categoryId);

		if (!category) {
			throw new AppError('Category is not found', 404);
		}

		const products = await Product.find().where({ category: categoryId });

		return products;
	}
}

export default new ListProductsByCategoryService();
