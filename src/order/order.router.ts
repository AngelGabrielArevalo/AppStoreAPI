import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { OrderController } from './controllers/order.controller';
import { OrderMiddleware } from './middlewares/order.middleware';
import { SchemaDto, LocationRequest } from '../common/types/types';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

export class OrderRouter extends BaseRouter<OrderController, OrderMiddleware> {
    constructor() {
        super(OrderController, OrderMiddleware);
    }

    routes(): void {
        this.router.get('/orders', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
        this.router.get(
			'/orders/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.findById(req, res, next)
		);
		this.router.post(
			'/orders',
			[this.middleware.validarDto(SchemaDto.CREATE, CreateOrderDto, LocationRequest.BODY)],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.create(req, res, next)
		);
		this.router.patch(
			'/orders/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
				this.middleware.validarDto(
					SchemaDto.UPDATE,
					UpdateOrderDto,
					LocationRequest.BODY
				),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.update(req, res, next)
		);
		this.router.delete(
			'/orders/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.delete(req, res, next)
		);
  }
}