import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { CategoryController } from '../../src/category/controllers/category.controller';
import { ServerBootstrap } from '../../src/server/server';
import { UserMiddleware } from '../../src/user/middlewares/user.middleware';
import { CategoryMiddleware } from '../../src/category/middlewares/category.middleware';

jest.mock('../../src/user/controllers/user.controller');
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
jest.spyOn(CategoryMiddleware.prototype, 'validateUUID').mockImplementation(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
jest.spyOn(CategoryMiddleware.prototype, 'validarDto').mockReturnValue(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
describe('Test CategoryRouter', () => {
	const server = new ServerBootstrap();

	test('GET:/categories -> llamaACategoryController.findAll', async () => {
		const mockController = jest
			.spyOn(CategoryController.prototype, 'findAll')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/categories');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('GET:/categories/:id -> llamaACategoryController.findById', async () => {
		const mockController = jest
			.spyOn(CategoryController.prototype, 'findById')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/categories/1234');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('POST:/categories -> llamaACategoryController.create', async () => {
		const mockController = jest
			.spyOn(CategoryController.prototype, 'create')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).post('/api/v1/categories');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('PATCH:/categories/:id -> llamaACategoryController.update', async () => {
		const mockController = jest
			.spyOn(CategoryController.prototype, 'update')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).patch('/api/v1/categories/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('DELETE:/categories/:id -> llamaACategoryController.delete', async () => {
		const mockController = jest
			.spyOn(CategoryController.prototype, 'delete')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).delete('/api/v1/categories/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});
});
