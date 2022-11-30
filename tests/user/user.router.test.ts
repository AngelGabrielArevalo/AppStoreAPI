import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { UserController } from '../../src/user/controllers/user.controller';
import { ServerBoostrap } from '../../src/server/server';
import { UserMiddleware } from '../../src/user/middlewares/user.middleware';

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

describe('Test UserRouter', () => {
	const server = new ServerBoostrap();

	beforeEach(() => {
		jest.spyOn(UserMiddleware.prototype, 'validateUUID').mockImplementation(
			(req: Request, res: Response, next: NextFunction) => {
				next();
			}
		);
		jest.spyOn(UserMiddleware.prototype, 'validarDto').mockReturnValue(
			(req: Request, res: Response, next: NextFunction) => {
				next();
			}
		);
	});

	test('GET:/users_llamaAuserController.findAll', async () => {
		const mockController = jest
			.spyOn(UserController.prototype, 'findAll')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/users');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('GET:/users/:id_llamaAuserController.findById', async () => {
		const mockController = jest
			.spyOn(UserController.prototype, 'findById')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).get('/api/v1/users/:123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('POST:/users/_llamaAuserController.create', async () => {
		const mockController = jest
			.spyOn(UserController.prototype, 'create')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).post('/api/v1/users');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('UPDATE:/users/:id/_llamaAuserController.update', async () => {
		const mockController = jest
			.spyOn(UserController.prototype, 'update')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).patch('/api/v1/users/:123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});

	test('DELETE:/users/:id/_llamaAuserController.delete', async () => {
		const mockController = jest
			.spyOn(UserController.prototype, 'delete')
			.mockImplementation(async (req: Request, res: Response, next: NextFunction) => {
				res.send('Mock controller');
			});

		const response = await request(server.app).delete('/api/v1/users/:123');

		expect(mockController).toHaveBeenCalledTimes(1);
		expect(response.text).toBe('Mock controller');
	});
});
