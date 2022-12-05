import { CustomerController } from '../../../src/customer/controllers/customer.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../../../src/customer/services/customer.service';
import { Customer } from '../../../src/customer/entities/customer.entity';
import { User } from '../../../src/user/entities/user.entity';
import { Rol } from '../../../src/common/types/types';
import { StatusCodes } from 'http-status-codes';
import { CreateCustomerDto } from '../../../src/customer/dtos/create-customer.dto';
import { UpdateCustomerDto } from '../../../src/customer/dtos/update-customer.dto';
import { DeleteResult } from 'typeorm';

jest.mock('../../../src/customer/services/customer.service.ts');

describe('Test CustomerController', () => {
	const customerController: CustomerController = new CustomerController();

    beforeEach(() => {
        jest.clearAllMocks();
    });
	test('findAll_conCustomersExistentes_respondeJSONConCustomersyStatus200', async () => {
		const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockCustomers: Customer[] = [
			{
				id: '2c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:47:51.295Z'),
				updatedAt: new Date('2022-11-23T00:47:51.295Z'),
				adress: 'AvenidaX123',
				phone: '1123451212',
				dni: '12123123',
				userId: {
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
			},
			{
				id: '3c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:47:51.295Z'),
				updatedAt: new Date('2022-11-23T00:47:51.295Z'),
				adress: 'AvenidaX123',
				phone: '1123451212',
				dni: '12123123',
				userId: {
					id: '1c3e1c21-9bae-4049-8474-2e36578377be',
					createdAt: new Date('2022-11-29T01:45:56.058Z'),
					updatedAt: new Date('2022-11-29T01:45:56.058Z'),
					name: 'Fernando',
					lastName: 'Alonso',
					userName: 'ferchu',
					email: 'ferchu@gmail.com',
					city: 'bsas',
					province: 'bsas',
					role: Rol.CUSTOMER,
					recoveryToken: 'token',
				},
			},
		];
		const mockService = jest
			.spyOn(CustomerService.prototype, 'findAll')
			.mockResolvedValue(mockCustomers);

		await customerController.findAll(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockCustomers);
	});

	test('findById_conIdInexistente_respondeJSONConCustomerYStatus200', async () => {
		const id: string = '2c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockCustomer: Customer = {
			id: '2c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:47:51.295Z'),
			updatedAt: new Date('2022-11-23T00:47:51.295Z'),
			adress: 'AvenidaX123',
			phone: '1123451212',
			dni: '12123123',
			userId: {
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
		};
		const mockService = jest
			.spyOn(CustomerService.prototype, 'findById')
			.mockResolvedValue(mockCustomer);

		await customerController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockCustomer);
	});

	test('findById_conIdInexistente_llamaANext', async () => {
		const id: string = '9c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'findById')
			.mockImplementation(() => {
				throw new Error();
			});

		await customerController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(id);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('create_conParametrosValidos_respondeJSONConCustomerCreadoYStatus201', async () => {
		const createCustomerDto: CreateCustomerDto = {
			userId: '1c9e1c44-9bae-4049-8475-2e36578377be' as unknown as User,
			adress: 'Roma 123',
			dni: '43987654',
			phone: '1512345432',
		};
		const customerCreated: Customer = {
			adress: 'Roma 123',
			phone: '1512345432',
			dni: '43987654',
			userId: '1c9e1c44-9bae-4049-8475-2e36578377be' as unknown as User,
			id: '5c6867b4-9f0b-4943-9c55-dc52f74fddbe',
			createdAt: new Date('2022-11-29T01:45:56.058Z'),
			updatedAt: new Date('2022-11-29T01:45:56.058Z'),
		};
		const req: Request = getMockReq({ body: createCustomerDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'create')
			.mockResolvedValue(customerCreated);

		await customerController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(createCustomerDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(customerCreated);
	});

	test('create_conParametrosInalidos_llamaANext', async () => {
		const createCustomerDto: CreateCustomerDto = {
			userId: 'ID QUE PERTENECE A OTRO USUARIO' as unknown as User,
			adress: 'Roma 123',
			dni: '43987654',
			phone: '1512345432',
		};
		const req: Request = getMockReq({ body: createCustomerDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'create')
			.mockImplementation(() => {
				throw new Error();
			});

		await customerController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(createCustomerDto);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('update_conParametrosValidos_respondeJSONConCustomerActualizadoYStatus200', async () => {
		const id: string = '9c3e1c21-9bae-4049-8473-2e36578377be';
		const updateCustomerDto: UpdateCustomerDto = {
			adress: 'Springfild 1234',
		};
		const customerUpdated: Customer = {
			adress: 'Springfild 1234',
			phone: '1512345432',
			dni: '43987654',
			userId: '9c3e1c21-9bae-4049-8473-2e36578377be' as unknown as User,
			id: '5c6867b4-9f0b-4943-9c55-dc52f74fddbe',
			createdAt: new Date('2022-11-29T01:45:56.058Z'),
			updatedAt: new Date('2022-11-29T01:45:56.058Z'),
		};
		const req: Request = getMockReq({ params: { id }, body: updateCustomerDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'update')
			.mockResolvedValue(customerUpdated);

		await customerController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(id, updateCustomerDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(customerUpdated);
	});

	test('update_conParametrosInvalidos_llamaANext', async () => {
		const id: string = 'ID INEXISTENTE';
		const updateCustomerDto: UpdateCustomerDto = {
			adress: 'Springfild 1234',
		};
		const req: Request = getMockReq({ params: { id }, body: updateCustomerDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'update')
			.mockImplementation(() => {
				throw new Error();
			});

		await customerController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(id, updateCustomerDto);
		expect(next).toHaveBeenCalledTimes(1);
	});

    test('delete_conParametrosValidos_respondeJSONConDeleterResultYStatus200', async () => {
		const id: string = '9c3e1c21-9bae-4049-8473-2e36578377be';
		const mockDeleteResult: DeleteResult = {
			affected: 1,
            raw: []
		};
		const req: Request = getMockReq({ params: { id }});
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'delete')
			.mockResolvedValue(mockDeleteResult);

		await customerController.delete(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockDeleteResult);
	});

	test('delete_conParametrosInvalidos_llamaANext', async () => {
		const id: string = 'ID INEXISTENTE';
		const req: Request = getMockReq({ params: { id }});
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CustomerService.prototype, 'delete')
			.mockImplementation(() => {
				throw new Error();
			});

		await customerController.delete(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toHaveBeenCalledWith(id);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
