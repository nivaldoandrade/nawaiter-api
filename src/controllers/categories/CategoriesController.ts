import { Request, Response } from 'express';
import { Category } from '../../models/Category';

import CreateCategoryService from '../../services/categories/CreateCategoryService';
import ShowCategoryService from '../../services/categories/ShowCategoryService';
import UpdateCategoryService from '../../services/categories/UpdateCategoryService';
import DeleteCategoryService from '../../services/categories/DeleteCategoryService';


export default class CategoriesController {

	public async list(request: Request, response: Response) {
		const categories = await Category.find();

		return response.status(200).json(categories);
	}

	public async show(request: Request, response: Response) {
		const { id } = request.params;

		const category = await ShowCategoryService.execute(id);

		return response.json(category);
	}

	public async create(request: Request, response: Response) {
		const { name, icon } = request.body;

		const result = await CreateCategoryService.execute({ name, icon });

		return response.json(result);
	}

	public async update(request: Request, response: Response) {
		const { id } = request.params;
		const { name, icon } = request.body;

		const category = await UpdateCategoryService.execute({ id, name, icon });

		return response.status(200).json(category);

	}

	public async delete(request: Request, response: Response) {
		const { id } = request.params;

		await DeleteCategoryService.execute(id);

		return response.status(204).json({});
	}
}
