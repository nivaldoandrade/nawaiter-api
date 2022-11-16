import express from 'express';

import CategoriesController from './controllers/categories/CategoriesController';

const router = express.Router();

const categoriesController = new CategoriesController();

router.get('/categories', categoriesController.list);
router.get('/categories/:id', categoriesController.show);
router.post('/categories', categoriesController.create);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.delete);

export default router;
