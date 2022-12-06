import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { OrderController } from '../../src/order/controllers/order.controller';
import { ServerBootstrap } from '../../src/server/server';
import { OrderMiddleware } from '../../src/order/middlewares/order.middleware';

jest.mock('../../src/order/controllers/order.controller');
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
jest.spyOn(OrderMiddleware.prototype, 'validateUUID').mockImplementation(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
jest.spyOn(OrderMiddleware.prototype, 'validarDto').mockReturnValue(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
describe('Test OrderRouter', () => {
	const server = new ServerBootstrap();

	test('GET:/orders -> llamaAOrderController.findAll', async () => {
		const mockController = jest
			.spyOn(OrderController.prototype, 'findAll')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/orders');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('GET:/orders/:id -> llamaAOrderController.findById', async () => {
		const mockController = jest
			.spyOn(OrderController.prototype, 'findById')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/orders/1234');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('POST:/orders -> llamaAOrderController.create', async () => {
		const mockController = jest
			.spyOn(OrderController.prototype, 'create')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).post('/api/v1/orders');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('PATCH:/orders/:id -> llamaAOrderController.update', async () => {
		const mockController = jest
			.spyOn(OrderController.prototype, 'update')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).patch('/api/v1/orders/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('DELETE:/orders/:id -> llamaAOrderController.delete', async () => {
		const mockController = jest
			.spyOn(OrderController.prototype, 'delete')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).delete('/api/v1/orders/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});
});
