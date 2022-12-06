import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { ProductController } from '../../src/product/controllers/product.controller';
import { ServerBootstrap } from '../../src/server/server';
import { ProductMiddleware } from '../../src/product/middlewares/product.middleware';

jest.mock('../../src/product/controllers/product.controller');
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
jest.spyOn(ProductMiddleware.prototype, 'validateUUID').mockImplementation(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
jest.spyOn(ProductMiddleware.prototype, 'validarDto').mockReturnValue(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
describe('Test ProductRouter', () => {
	const server = new ServerBootstrap();

	test('GET:/products -> llamaAProductController.findAll', async () => {
		const mockController = jest
			.spyOn(ProductController.prototype, 'findAll')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/products');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('GET:/products/:id -> llamaAProductController.findById', async () => {
		const mockController = jest
			.spyOn(ProductController.prototype, 'findById')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/products/1234');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('POST:/products -> llamaAProductController.create', async () => {
		const mockController = jest
			.spyOn(ProductController.prototype, 'create')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).post('/api/v1/products');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('PATCH:/products/:id -> llamaAProductController.update', async () => {
		const mockController = jest
			.spyOn(ProductController.prototype, 'update')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).patch('/api/v1/products/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('DELETE:/products/:id -> llamaAProductController.delete', async () => {
		const mockController = jest
			.spyOn(ProductController.prototype, 'delete')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).delete('/api/v1/products/123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});
});
