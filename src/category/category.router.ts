import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { CategoryController } from './controllers/category.controller';
import { CategoryMiddleware } from './middlewares/category.middleware';
import { SchemaDto, LocationRequest } from '../common/types/types';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {
    constructor() {
        super(CategoryController, CategoryMiddleware);
    }

    routes(): void {
        this.router.get('/categories', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
        this.router.get(
			'/categories/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.findById(req, res, next)
		);
		this.router.post(
			'/categories',
			[this.middleware.validarDto(SchemaDto.CREATE, CreateCategoryDto, LocationRequest.BODY)],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.create(req, res, next)
		);
		this.router.patch(
			'/categories/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
				this.middleware.validarDto(
					SchemaDto.UPDATE,
					UpdateCategoryDto,
					LocationRequest.BODY
				),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.update(req, res, next)
		);
		this.router.delete(
			'/categories/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.delete(req, res, next)
		);
  }
}