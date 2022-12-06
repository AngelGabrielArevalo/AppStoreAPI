import { NextFunction, Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { StatusCodes } from 'http-status-codes';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { DeleteResult } from 'typeorm';

export class OrderController {
	constructor(private readonly orderService = new OrderService()) {}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const orders: Order[] = await this.orderService.findAll();

		res.status(StatusCodes.OK).json(orders);
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const order: Order | undefined = await this.orderService.findById(id);

			res.status(StatusCodes.OK).json(order);
		} catch (error: any) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const createOrderDto: CreateOrderDto = req.body;

			const newOrder: Order | undefined = await this.orderService.create(
				createOrderDto
			);

			res.status(StatusCodes.CREATED).json(newOrder);
		} catch (error: any) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const updateOrderDto: UpdateOrderDto = req.body;

			const orderUpdated: Order | undefined = await this.orderService.update(
				id,
				updateOrderDto
			);

            res.status(StatusCodes.OK).json(orderUpdated);
		} catch (error: any) {
			next(error);
		}
	}

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;

            const resultDelete: DeleteResult | undefined = await this.orderService.delete(id);

            res.status(StatusCodes.OK).json(resultDelete);
        } catch(error: any){
            next(error)
        }
    }
}
