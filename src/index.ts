import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import cors, { allowedOrigins } from './middlewares/cors';

import router from './routes';

import AppError from './errors/AppError';

const port = 3333;

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
	cors: {
		origin: allowedOrigins
	}
});


mongoose.connect('mongodb://localhost:27017/nawaiter')
	.then(() => {
		app.use(cors);
		app.use(express.json());
		app.use('/upload', express.static('uploads'));
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

		httpServer.listen(port, () => {
			console.log(`🚀 Server is running on http://localhost:${port}`);
		});
	}).catch((error) => {
		console.log('Erro ao conectar no mongoDB');
		console.log(error);
	});


