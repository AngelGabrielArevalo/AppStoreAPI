import { NextFunction, Request, Response } from 'express';
import { OrderProductService } from '../services/order-product.service';
import { OrderProduct } from '../entities/order-product.entity';
import { StatusCodes } from 'http-status-codes';
import { CreateOrderProductDto } from '../dtos/create-order-product.dto';
import { UpdateOrderProductDto } from '../dtos/update-order-product.dto';
import { DeleteResult } from 'typeorm';

export class OrderProductController {
	constructor(private readonly orderProductService = new OrderProductService()) {}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const orderProducts: OrderProduct[] = await this.orderProductService.findAll();

		res.status(StatusCodes.OK).json(orderProducts);
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const orderProduct: OrderProduct | undefined = await this.orderProductService.findById(
				id
			);

			res.status(StatusCodes.OK).json(orderProduct);
		} catch (error: any) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const createOrderProductDto: CreateOrderProductDto = req.body;

			const newOrderProduct: OrderProduct | undefined = await this.orderProductService.create(
				createOrderProductDto
			);

			res.status(StatusCodes.CREATED).json(newOrderProduct);
		} catch (error: any) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const updateOrderProductDto: UpdateOrderProductDto = req.body;

			const orderProductUpdated: OrderProduct | undefined =
				await this.orderProductService.update(id, updateOrderProductDto);

			res.status(StatusCodes.OK).json(orderProductUpdated);
		} catch (error: any) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;

			const resultDelete: DeleteResult | undefined = await this.orderProductService.delete(
				id
			);

			res.status(StatusCodes.OK).json(resultDelete);
		} catch (error: any) {
			next(error);
		}
	}
}
