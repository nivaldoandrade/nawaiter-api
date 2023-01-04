import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';


import CategoriesController from './controllers/categories/CategoriesController';
import OrdersController from './controllers/orders/OrdersController';
import ProductImageController from './controllers/products/ProductImageController';
import ProductsController from './controllers/products/ProductsController';

const router = express.Router();
const upload = multer(multerConfig);

const categoriesController = new CategoriesController();
const productsController = new ProductsController();
const productImageController = new ProductImageController();
const ordersController = new OrdersController();

//CATEGORY
router.get('/categories', categoriesController.list);
router.get('/categories/:id', categoriesController.show);
router.get('/categories/:categoryId/products', categoriesController.listProductsByCategory);
router.post('/categories', categoriesController.create);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.delete);

//PRODUCT
router.get('/products', productsController.list);
router.get('/products/:id', productsController.show);
router.post('/products', upload.single('imagePath'), productsController.create);
router.put('/products/:id', productsController.update);
router.patch('/products/:id/image', upload.single('imagePath'), productImageController.update);
router.delete('/products/:id', productsController.delete);

//ORDER
router.get('/orders', ordersController.list);
router.get('/orders/:id', ordersController.show);
router.post('/orders', ordersController.create);
router.put('/orders/:id', ordersController.update);
router.put('/orders/:id/production', ordersController.productionStatus);
router.put('/orders/:id/done', ordersController.doneStatus);
router.delete('/orders/:id', ordersController.delete);

export default router;
