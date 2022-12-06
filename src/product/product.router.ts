import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { ProductController } from './controllers/product.controller';
import { ProductMiddleware } from './middlewares/product.middleware';
import { SchemaDto, LocationRequest } from '../common/types/types';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

export class ProductRouter extends BaseRouter<ProductController, ProductMiddleware> {
    constructor() {
        super(ProductController, ProductMiddleware);
    }

    routes(): void {
        this.router.get('/products', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
        this.router.get(
			'/products/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.findById(req, res, next)
		);
		this.router.post(
			'/products',
			[this.middleware.validarDto(SchemaDto.CREATE, CreateProductDto, LocationRequest.BODY)],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.create(req, res, next)
		);
		this.router.patch(
			'/products/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
				this.middleware.validarDto(
					SchemaDto.UPDATE,
					UpdateProductDto,
					LocationRequest.BODY
				),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.update(req, res, next)
		);
		this.router.delete(
			'/products/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.delete(req, res, next)
		);
  }
}