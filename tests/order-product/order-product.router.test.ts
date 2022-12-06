import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { OrderProductController } from '../../src/order-product/controllers/order-product.controller';
import { ServerBootstrap } from '../../src/server/server';
import { OrderProductMiddleware } from '../../src/order-product/middlewares/order-product.middleware';

jest.mock('../../src/order-product/controllers/order-product.controller');
jest.mock('morgan', () => {
	return () => {
		return (req: Request, res: Response, next: NextFunction) => {
			next();
		};
	};
});
jest.mock('cors', () => {
	return () => {
		return (req: Request, res: Response, next: NextFunction) => {
			next();
		};
	};
});
jest.spyOn(OrderProductMiddleware.prototype, 'validateUUID').mockImplementation(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
jest.spyOn(OrderProductMiddleware.prototype, 'validarDto').mockReturnValue(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);

describe('Test OrderProductRouter', () => {
	const server = new ServerBootstrap();

	test('GET:/orders-products -> llamaAOrderProductController.findAll', async () => {
		const mockController = jest
			.spyOn(OrderProductController.prototype, 'findAll')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/orders-products');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('GET:/orders-products/:id -> llamaAOrderProductController.findById', async () => {
		const mockController = jest
			.spyOn(OrderProductController.prototype, 'findById')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/orders-products/1234');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('POST:/orders-products -> llamaAOrderProductController.create', async () => {
		const mockController = jest
			.spyOn(OrderProductController.prototype, 'create')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).post('/api/v1/orders-products');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('PATCH:/orders-products/:id -> llamaAOrderProductController.update', async () => {
		const mockController = jest
			.spyOn(OrderProductController.prototype, 'update')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).patch('/api/v1/orders-products/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('DELETE:/orders-products/:id -> llamaAOrderProductController.delete', async () => {
		const mockController = jest
			.spyOn(OrderProductController.prototype, 'delete')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).delete('/api/v1/orders-products/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});
});
