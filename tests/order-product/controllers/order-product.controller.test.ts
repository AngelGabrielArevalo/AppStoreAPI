import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from 'express';
import { OrderProductController } from '../../../src/order-product/controllers/order-product.controller';
import { OrderProduct } from '../../../src/order-product/entities/order-product.entity';
import { OrderProductService } from '../../../src/order-product/services/order-product.service';
import { StatusCodes } from 'http-status-codes';
import { CreateOrderProductDto } from '../../../src/order-product/dtos/create-order-product.dto';
import { UpdateOrderProductDto } from '../../../src/order-product/dtos/update-order-product.dto';
import { DeleteResult } from 'typeorm';
import { Rol } from '../../../src/common/types/types';
import { Product } from '../../../src/product/entities/product.entity';
import { Order } from '../../../src/order/entities/order.entity';

describe('Tests OrderProductController', () => {
	const orderProductController: OrderProductController = new OrderProductController();

	test('findAll_conOrderProductsExistentes_respondeJSONConOrderProductsYStatus200', async () => {
		const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockOrderProducts: OrderProduct[] = [
			{
				id: '5c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				amount: 3,
				productId: {
					id: '5c4e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					name: 'Onda Civic',
					description: 'Auto 0KM',
					price: 10000,
					image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
					categoryId: {
						id: '5c3e1c21-9bae-4049-8473-2e36578377be',
						createdAt: new Date('2022-11-23T00:48:14.555Z'),
						updatedAt: new Date('2022-11-23T00:48:14.555Z'),
						name: 'vehiculos',
						image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
					},
				},
				orderId: {
					id: '5c4e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					customerId: {
						id: '2c3e1c21-9bae-4049-8473-2e36578377be',
						createdAt: new Date('2022-11-23T00:48:14.555Z'),
						updatedAt: new Date('2022-11-23T00:48:14.555Z'),
						adress: 'AvenidaX123',
						phone: '1123451212',
						dni: '12123123',
						userId: {
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
						},
					},
				},
			},
		];
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'findAll')
			.mockResolvedValue(mockOrderProducts);

		await orderProductController.findAll(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockOrderProducts);
	});

	test('findById_conIdExistente_respondeJSONConOrderProductYStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockOrderProduct: OrderProduct = {
			id: '5c4e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			amount: 3,
			productId: {
				id: '5c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'Onda Civic',
				description: 'Auto 0KM',
				price: 10000,
				image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				categoryId: {
					id: '5c3e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					name: 'vehiculos',
					image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				},
			},
			orderId: {
				id: '5c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				customerId: {
					id: '2c3e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					adress: 'AvenidaX123',
					phone: '1123451212',
					dni: '12123123',
					userId: {
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
					},
				},
			},
		};
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'findById')
			.mockResolvedValue(mockOrderProduct);

		await orderProductController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockOrderProduct);
	});

	test('findById_conIdInexistente_llamaANext', async () => {
		const id: string = '7c7e7c77-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'findById')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderProductController.findById(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('create_conParametrosValidos_respondeJSONConOrderProductYStatus201', async () => {
		const createOrderProductDto: CreateOrderProductDto = {
			productId: '8c4e1c21-9bae-4049-8473-2e36578377be' as unknown as Product,
			orderId: '4c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Order,
			amount: 10,
		};
		const req: Request = getMockReq({ body: createOrderProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockNewOrderProduct: OrderProduct = {
			id: '5c4e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			amount: 10,
			productId: {
				id: '8c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'Onda Civic',
				description: 'Auto 0KM',
				price: 10000,
				image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				categoryId: {
					id: '5c3e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					name: 'vehiculos',
					image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				},
			},
			orderId: {
				id: '4c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				customerId: {
					id: '2c3e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					adress: 'AvenidaX123',
					phone: '1123451212',
					dni: '12123123',
					userId: {
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
					},
				},
			},
		};
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'create')
			.mockResolvedValue(mockNewOrderProduct);

		await orderProductController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(createOrderProductDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockNewOrderProduct);
	});

	test('create_conParametrosInvalidos_llamaANext', async () => {
		const createOrderProductDto: CreateOrderProductDto = {
			productId: 'ID INEXISTENTE' as unknown as Product,
			orderId: '4c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Order,
			amount: 10,
		};
		const req: Request = getMockReq({ body: createOrderProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'create')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderProductController.create(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('update_conParametrosValidos_respondeJSONConOrderProductYStatus200', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderProductDto: UpdateOrderProductDto = {
			amount: 20,
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateOrderProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockOrderProductUpdated: OrderProduct = {
			id: '5c4e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			amount: 20,
			productId: {
				id: '8c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'Onda Civic',
				description: 'Auto 0KM',
				price: 10000,
				image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				categoryId: {
					id: '5c3e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					name: 'vehiculos',
					image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				},
			},
			orderId: {
				id: '4c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				customerId: {
					id: '2c3e1c21-9bae-4049-8473-2e36578377be',
					createdAt: new Date('2022-11-23T00:48:14.555Z'),
					updatedAt: new Date('2022-11-23T00:48:14.555Z'),
					adress: 'AvenidaX123',
					phone: '1123451212',
					dni: '12123123',
					userId: {
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
					},
				},
			},
		};
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'update')
			.mockResolvedValue(mockOrderProductUpdated);

		await orderProductController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id, updateOrderProductDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockOrderProductUpdated);
	});

	test('update_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderProductDto: UpdateOrderProductDto = {
			orderId: 'ID INEXISTENTE' as unknown as Order,
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateOrderProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'update')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderProductController.update(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('delete_conParametrosValidos_respondeJSONConDeleteResultYAffectEn1YStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id }});
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'delete')
			.mockResolvedValue(mockDeleteResult);

		await orderProductController.delete(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockDeleteResult);
	});

	test('delete_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '7c3e1c21-7bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderProductService.prototype, 'delete')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderProductController.delete(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});
});
