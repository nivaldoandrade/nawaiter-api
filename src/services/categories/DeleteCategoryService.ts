import { isValidObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Category } from '../../models/Category';


class DeleteCategoryService {

	public async execute(id: string) {

		if (!isValidObjectId(id)) {
			throw new AppError('CategoryId is invalid');
		}

		const category = await Category.findByIdAndDelete(id);

		if (!category) {
			throw new AppError('Category is not found', 404);
		}
	}
}

export default new DeleteCategoryService();
