import request from 'supertest';
import { ServerBootstrap } from '../../src/server/server';
import { NextFunction, Request, Response } from 'express';
import { CustomerController } from '../../src/customer/controllers/customer.controller';
import { CustomerMiddleware } from '../../src/customer/middlewares/customer.middlewares';

jest.mock('../../src/customer/controllers/customer.controller.ts');
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
jest.spyOn(CustomerMiddleware.prototype, 'validateUUID').mockImplementation(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
jest.spyOn(CustomerMiddleware.prototype, 'validarDto').mockReturnValue(
	(req: Request, res: Response, next: NextFunction) => {
		next();
	}
);

describe('Tests CustomerRouter', () => {
	const server = new ServerBootstrap();

	test('GET:/customers -> llamaACustomerController.findAll', async () => {
		const mockController = jest
			.spyOn(CustomerController.prototype, 'findAll')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('MOCK CONTROLLER');
			});

		const response = await request(server.app).get('/api/v1/customers');

		expect(mockController).toBeCalled();
		expect(response.text).toBe('MOCK CONTROLLER');
	});

	test('GET:/customers/:id -> llamaACustomerController.findById', async () => {
		const mockController = jest
			.spyOn(CustomerController.prototype, 'findById')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('MOCK CONTROLLER');
			});

		const response = await request(server.app).get('/api/v1/customers/12');

		expect(mockController).toBeCalled();
		expect(response.text).toBe('MOCK CONTROLLER');
	});

	test('POST:/customers -> llamaACustomerController.create', async () => {
		const mockController = jest
			.spyOn(CustomerController.prototype, 'create')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('MOCK CONTROLLER');
			});

		const response = await request(server.app).post('/api/v1/customers');

		expect(mockController).toBeCalled();
		expect(response.text).toBe('MOCK CONTROLLER');
	});

	test('PATCH:/customers/:id -> llamaACustomerController.update', async () => {
		const mockController = jest
			.spyOn(CustomerController.prototype, 'update')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('MOCK CONTROLLER');
			});

		const response = await request(server.app).patch('/api/v1/customers/:id');

		expect(mockController).toBeCalled();
		expect(response.text).toBe('MOCK CONTROLLER');
	});

	test('DELETE:/customers/:id -> llamaACustomerController.delete', async () => {
		const mockController = jest
			.spyOn(CustomerController.prototype, 'delete')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('MOCK CONTROLLER');
			});

		const response = await request(server.app).delete('/api/v1/customers/:id');

		expect(mockController).toBeCalled();
		expect(response.text).toBe('MOCK CONTROLLER');
	});
});
