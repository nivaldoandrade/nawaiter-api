import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';


import CategoriesController from './controllers/categories/CategoriesController';
import ProductsController from './controllers/products/ProductsController';

const router = express.Router();
const upload = multer(multerConfig);

const categoriesController = new CategoriesController();
const productsController = new ProductsController();

//CATEGORY
router.get('/categories', categoriesController.list);
router.get('/categories/:id', categoriesController.show);
router.post('/categories', categoriesController.create);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.delete);

//PRODUCT
router.get('/products', productsController.list);
router.get('/products/:id', productsController.show);
router.post('/products', upload.single('imagePath'), productsController.create);

export default router;
