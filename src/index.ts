import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import router from './routes';

import AppError from './errors/AppError';

mongoose.connect('mongodb://localhost:27017/nawaiter')
	.then(() => {
		const app = express();
		const port = 3333;

		app.use(express.json());
		app.use(router);

		app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
			console.log(err);
			if (err instanceof AppError) {
				return response.status(err.statusCode).json({
					status: 'error',
					message: err.message
				});
			}

			console.error(err);

			return response.status(500).json({
				status: 'error',
				message: 'Internal server error'
			});
		});

		app.listen(port, () => {
			console.log(`🚀 Server is running on http://localhost:${port}`);
		});
	}).catch((error) => {
		console.log('Erro ao conectar no mongoDB');
		console.log(error);
	});


