import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from 'express';
import { LocationRequest, Rol, SchemaDto } from '../../../src/common/types/types';
import { BaseMiddleware } from '../../../src/common/middlewares/base.middleware';
import boom from '@hapi/boom';
import { httpResponseMessages } from '../../../src/common/utils/responses';
import { CreateUserDto } from '../../../src/user/dtos/create-user.dto';

describe('Tests BaseMiddlewares', () => {
	const baseMiddleware: BaseMiddleware = new BaseMiddleware();

	test('validarDto_conParametrosValidos_llamaANext', () => {
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

		const midlleware = baseMiddleware.validarDto(
			SchemaDto.CREATE,
			CreateUserDto,
			LocationRequest.BODY
		);
		midlleware(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('validarDto_conParametrosInvalidos_respondeJSONConErroresYStatus400', () => {
		const createUserDto = {
			name: 'Pedro',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: 'angel@gmail.com',
			password: '1234',
			city: 'bsas',
			role: Rol.ADMIN,
		};
		const req: Request = getMockReq({ body: createUserDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockError = [
			{
				message: '"province" is required',
				path: ['province'],
				type: 'any.required',
				context: { label: 'province', key: 'province' },
			},
		];

		const middlwware = baseMiddleware.validarDto(
			SchemaDto.CREATE,
			CreateUserDto,
			LocationRequest.BODY
		);
		middlwware(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toBeCalledWith(boom.badRequest(JSON.stringify(mockError)));
	});

	test('validarUUID_conIdValido_llamaANext', () => {
		const id: string = '1c3e1c33-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;

		baseMiddleware.validateUUID(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('validarUUID_conParametrosInvalidos_respondeJSONConErrorYStatus400', () => {
		const id: string = '1234';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;

		baseMiddleware.validateUUID(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toBeCalledWith(boom.badRequest(httpResponseMessages.invalidId));
	});
});
