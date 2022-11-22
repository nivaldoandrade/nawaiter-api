import { isValidObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';


class DeleteCategoryService {

	public async execute(id: string) {

		if (!isValidObjectId(id)) {
			throw new AppError('CategoryId is invalid');
		}

		const productByCategory = await Product.find({ category: id }, null, { limit: 1 });

		if (productByCategory.length === 1) {
			throw new AppError('The category is being used');
		}

		const category = await Category.findByIdAndDelete(id);

		if (!category) {
			throw new AppError('Category is not found', 404);
		}
	}
}

export default new DeleteCategoryService();
