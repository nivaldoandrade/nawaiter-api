import { isValidObjectId } from 'mongoose';
import { Category } from '../../models/Category';

import AppError from '../../errors/AppError';


class ShowCategoryService {

	public async execute(id: string) {
		if (!isValidObjectId(id)) {
			throw new AppError('CategoryId is invalid');
		}

		const category = await Category.findById(id);

		if (!category) {
			throw new AppError('Category is not found', 404);
		}

		return category;
	}
}

export default new ShowCategoryService();
