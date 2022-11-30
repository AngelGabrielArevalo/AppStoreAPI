import { NextFunction, Request, Response } from 'express';
import { UserController } from '../../../src/user/controllers/user.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { UserService } from '../../../src/user/services/user.service';
import { User } from '../../../src/user/entities/user.entity';
import { Rol } from '../../../src/common/types/types';
import { StatusCodes } from 'http-status-codes';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from '../../../src/user/dtos/create-user.dto';
import { UpdateUserDto } from '../../../src/user/dtos/update-user.dto';

jest.mock('../../../src/user/services/user.service');

describe('Test UserController', () => {
	const userController = new UserController();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('findAll_conUsersExistentes_responseJSONConUsersYStatus200', async () => {
		const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockUsers: User[] = [
			{
				id: '1c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-29T01:45:56.058Z'),
				updatedAt: new Date('2022-11-29T01:45:56.058Z'),
				name: 'Angel',
				lastName: 'Arevalo',
				userName: 'angelgabriel',
				email: 'angel@gmail.com',
				city: 'bsas',
				province: 'bsas',
				role: Rol.ADMIN,
				recoveryToken: 'token',
			},
			{
				id: '1c3e1c21-9bae-4049-8474-2e36578377be',
				createdAt: new Date('2022-11-29T01:45:56.058Z'),
				updatedAt: new Date('2022-11-29T01:45:56.058Z'),
				name: 'Fernando',
				lastName: 'Alonso',
				userName: 'ferchu',
				email: 'ferchu@gmail.com',
				city: 'bsas',
				province: 'bsas',
				role: Rol.USER,
				recoveryToken: 'token',
			},
			{
				id: '1c3e1c21-9bae-4049-8475-2e36578377be',
				createdAt: new Date('2022-11-29T01:45:56.058Z'),
				updatedAt: new Date('2022-11-29T01:45:56.058Z'),
				name: 'Laura',
				lastName: 'Lopez',
				userName: 'lauri',
				email: 'laulopez@gmail.com',
				city: 'bsas',
				province: 'bsas',
				role: Rol.CUSTOMER,
				recoveryToken: 'token',
			},
		];
		const mockService = jest
			.spyOn(UserService.prototype, 'findAll')
			.mockResolvedValue(mockUsers);

		await userController.findAll(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(mockUsers);
	});

	test('findById_conIdExistente_respondeJSONConUserYStatus200', async () => {
		const id: string = '1c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockUser: User = {
			id: '1c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-29T01:45:56.058Z'),
			updatedAt: new Date('2022-11-29T01:45:56.058Z'),
			name: 'Angel',
			lastName: 'Arevalo',
			userName: 'angelgabriel',
			email: 'angel@gmail.com',
			city: 'bsas',
			province: 'bsas',
			role: Rol.ADMIN,
			recoveryToken: 'token',
		};
		const mockService = jest
			.spyOn(UserService.prototype, 'findById')
			.mockResolvedValue(mockUser);

		await userController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(mockUser);
	});

	test('findById_conIdInexistente_llamaANext', async () => {
		const id: string = 'notfound';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest.spyOn(UserService.prototype, 'findById').mockImplementation(() => {
			throw new Error();
		});

		await userController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('create_conParametrosValidos_respondeJSONConNewUserYStatus201', async () => {
		const createUserDto: CreateUserDto = {
			name: 'Pedro',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: 'angel@gmail.com',
			password: '1234',
			city: 'bsas',
			province: 'province',
			role: Rol.ADMIN,
		};
		const mockNewUser: User = {
			id: '1c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-29T01:45:56.058Z'),
			updatedAt: new Date('2022-11-29T01:45:56.058Z'),
			name: 'Pedro',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: 'angel@gmail.com',
			city: 'bsas',
			province: 'province',
			role: Rol.ADMIN,
			recoveryToken: 'token',
		};
		const req: Request = getMockReq({ body: createUserDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(UserService.prototype, 'create')
			.mockResolvedValue(mockNewUser);

		await userController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(createUserDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(mockNewUser);
	});

	test('create_conParametrosInvalidos_llamaANext', async () => {
		const createUserDto: CreateUserDto = {
			name: 'Pedro',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: 'angel@gmail.com',
			password: '1234',
			city: 'bsas',
			province: 'province',
			role: Rol.ADMIN,
		};
		const req: Request = getMockReq({ body: createUserDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest.spyOn(UserService.prototype, 'create').mockImplementation(() => {
			throw new Error();
		});

		await userController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(createUserDto);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('update_conParametrosValidos_respondeJSONConUserUpdateYStatus200', async () => {
		const id: string = '1c3e1c21-9bae-4049-8473-2e36578377be';
		const updateUserDto: UpdateUserDto = {
			name: 'Laura',
			lastName: 'Fernandez',
		};
		const mockUserUpdated: User = {
			id: '1c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-29T01:45:56.058Z'),
			updatedAt: new Date('2022-11-29T01:45:56.058Z'),
			name: 'Laura',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: 'angel@gmail.com',
			city: 'bsas',
			province: 'province',
			role: Rol.ADMIN,
			recoveryToken: 'token',
		};
		const req: Request = getMockReq({ body: updateUserDto, params: { id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(UserService.prototype, 'update')
			.mockResolvedValue(mockUserUpdated);

		await userController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id, updateUserDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(mockUserUpdated);
	});

	test('update_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '1c3e1c21-9bae-4049-8473-2e36578377be';
		const updateUserDto: UpdateUserDto = {
			name: 'Laura',
			lastName: 'Fernandez',
		};
		const req: Request = getMockReq({ body: updateUserDto, params: { id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest.spyOn(UserService.prototype, 'update').mockImplementation(() => {
			throw new Error();
		});

		await userController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id, updateUserDto);
		expect(next).toHaveBeenCalledTimes(1);
	});

    test('delete_conIdExistente_respondeJSONConResultDeleteConAfectedEn1YStatus200', async () => {
		const id: string = '1c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
        const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
		const mockService = jest
			.spyOn(UserService.prototype, 'delete')
			.mockResolvedValue(mockDeleteResult);

		await userController.delete(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(mockDeleteResult);
	});

    test('delete_conErrorAlEliminar_lanzaBoomExcepcionBadRequest', async () => {
		const id: string = 'error';
		const req: Request = getMockReq({ params: { id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
        const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
		const mockService = jest.spyOn(UserService.prototype, 'delete').mockImplementation(() => {
			throw new Error();
		});

		await userController.delete(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
