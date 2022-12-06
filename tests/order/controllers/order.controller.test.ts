import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from 'express';
import { OrderController } from '../../../src/order/controllers/order.controller';
import { Order } from '../../../src/order/entities/order.entity';
import { OrderService } from '../../../src/order/services/order.service';
import { StatusCodes } from 'http-status-codes';
import { CreateOrderDto } from '../../../src/order/dtos/create-order.dto';
import { UpdateOrderDto } from '../../../src/order/dtos/update-order.dto';
import { DeleteResult } from 'typeorm';
import { Category } from '../../../src/category/entities/category.entity';
import { Customer } from '../../../src/customer/entities/customer.entity';

describe('Tests OrderController', () => {
	const orderController: OrderController = new OrderController();

	test('findAll_conOrdersExistentes_respondeJSONConOrdersYStatus200', async () => {
		const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockOrders: Order[] = [
			{
				id: '5c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
			},
			{
				id: '3c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
			},
		];
		const mockService = jest
			.spyOn(OrderService.prototype, 'findAll')
			.mockResolvedValue(mockOrders);

		await orderController.findAll(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockOrders);
	});

	test('findById_conIdExistente_respondeJSONConOrderYStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockOrder: Order = {
			id: '5c4e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};
		const mockService = jest
			.spyOn(OrderService.prototype, 'findById')
			.mockResolvedValue(mockOrder);

		await orderController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockOrder);
	});

	test('findById_conIdInexistente_llamaANext', async () => {
		const id: string = '7c7e7c77-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderService.prototype, 'findById')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderController.findById(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('create_conParametrosValidos_respondeJSONConOrderYStatus201', async () => {
		const createOrderDto: CreateOrderDto = {
			customerId: '8c8e8c88-9bae-4049-8473-8e38888387be' as unknown as Customer,
		};
		const req: Request = getMockReq({ body: createOrderDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockNewOrder: Order = {
			id: '5c4e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			customerId: '8c8e8c88-9bae-4049-8473-8e38888387be' as unknown as Customer,
		};
		const mockService = jest
			.spyOn(OrderService.prototype, 'create')
			.mockResolvedValue(mockNewOrder);

		await orderController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(createOrderDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockNewOrder);
	});

	test('create_conParametrosInvalidos_llamaANext', async () => {
		const createOrderDto: CreateOrderDto = {
			customerId: 'ID INEXISTENTE' as unknown as Customer,
		};
		const req: Request = getMockReq({ body: createOrderDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderService.prototype, 'create')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderController.create(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('update_conParametrosValidos_respondeJSONConOrderYStatus200', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderDto: UpdateOrderDto = {
			customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateOrderDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockOrderUpdated: Order = {
			id: '5c4e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};
		const mockService = jest
			.spyOn(OrderService.prototype, 'update')
			.mockResolvedValue(mockOrderUpdated);

		await orderController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id, updateOrderDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockOrderUpdated);
	});

	test('update_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderDto: UpdateOrderDto = {
			customerId: 'ID INEXISTENTE' as unknown as Customer,
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateOrderDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(OrderService.prototype, 'update')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderController.update(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('delete_conParametrosValidos_respondeJSONConDeleteResultYAffectEn1YStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id }});
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
		const mockService = jest
			.spyOn(OrderService.prototype, 'delete')
			.mockResolvedValue(mockDeleteResult);

		await orderController.delete(req, res, next);

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
			.spyOn(OrderService.prototype, 'delete')
			.mockImplementation(() => {
				throw new Error();
			});

		await orderController.delete(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});
});
