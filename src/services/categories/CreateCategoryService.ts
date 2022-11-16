import AppError from '../../errors/AppError';
import { Category } from '../../models/Category';

interface IRequest {
	name: string;
	icon: string;
}

class CreateCategoryService {

	public async execute({ name, icon }: IRequest) {
		if (!name) {
			throw new AppError('Name is required');
		}

		if (!icon) {
			throw new AppError('Icon is required');
		}

		const category = await Category.create({ name, icon });

		return category;
	}
}

export default new CreateCategoryService();
