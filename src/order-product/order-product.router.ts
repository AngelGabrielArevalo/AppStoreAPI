import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { OrderProductController } from './controllers/order-product.controller';
import { OrderProductMiddleware } from './middlewares/order-product.middleware';
import { SchemaDto, LocationRequest } from '../common/types/types';
import { CreateOrderProductDto } from './dtos/create-order-product.dto';
import { UpdateOrderProductDto } from './dtos/update-order-product.dto';

export class OrderProductRouter extends BaseRouter<OrderProductController, OrderProductMiddleware> {
	constructor() {
		super(OrderProductController, OrderProductMiddleware);
	}

	routes(): void {
		this.router.get('/orders-products', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
		this.router.get(
			'/orders-products/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.findById(req, res, next)
		);
		this.router.post(
			'/orders-products',
			[this.middleware.validarDto(SchemaDto.CREATE, CreateOrderProductDto, LocationRequest.BODY)],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.create(req, res, next)
		);
		this.router.patch(
			'/orders-products/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
				this.middleware.validarDto(
					SchemaDto.UPDATE,
					UpdateOrderProductDto,
					LocationRequest.BODY
				),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.update(req, res, next)
		);
		this.router.delete(
			'/orders-products/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.delete(req, res, next)
		);
	}
}
