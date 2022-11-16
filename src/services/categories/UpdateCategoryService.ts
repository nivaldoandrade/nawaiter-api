import { isValidObjectId } from 'mongoose';
import AppError from '../../errors/AppError';
import { Category } from '../../models/Category';

interface IRequest {
	id: string;
	name: string;
	icon: string;
}

class UpdateCategoryService {

	public async execute({ id, name, icon }: IRequest) {
		if (!isValidObjectId(id)) {
			throw new AppError('Id is invalid');
		}

		if (!name) {
			throw new AppError('Name is required');
		}

		if (!icon) {
			throw new AppError('Icon is required');
		}

		const category = await Category.findByIdAndUpdate(id, { name, icon }, { new: true });

		if (!category) {
			throw new AppError('Category is not found', 404);
		}


		return category;
	}
}


export default new UpdateCategoryService();
