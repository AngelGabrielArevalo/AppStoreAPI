import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { LocationRequest, SchemaDto } from '../common/types/types';
import { CustomerController } from './controllers/customer.controller';
import { CustomerMiddleware } from './middlewares/customer.middlewares';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

export class CustomerRouter extends BaseRouter<CustomerController, CustomerMiddleware> {
	constructor() {
		super(CustomerController, CustomerMiddleware);
	}

	routes(): void {
		this.router.get('/customers', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
		this.router.get(
			'/customers/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.findById(req, res, next)
		);
		this.router.post(
			'/customers',
			[this.middleware.validarDto(SchemaDto.CREATE, CreateCustomerDto, LocationRequest.BODY)],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.create(req, res, next)
		);
		this.router.patch(
			'/customers/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
				this.middleware.validarDto(
					SchemaDto.UPDATE,
					UpdateCustomerDto,
					LocationRequest.BODY
				),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.update(req, res, next)
		);
		this.router.delete(
			'/customers/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.delete(req, res, next)
		);
	}
}
