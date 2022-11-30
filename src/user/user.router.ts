import { Response, NextFunction, Request } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { LocationRequest, SchemaDto } from '../common/types/types';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';
import { UpdateUserDto } from './dtos/update-user.dto';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
	constructor() {
		super(UserController, UserMiddleware);
	}

	routes(): void {
		this.router.get('/users', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
		this.router.get(
			'/users/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.findById(req, res, next)
		);
		this.router.patch(
			'/users/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
					this.middleware.validarDto(
						SchemaDto.UPDATE,
						UpdateUserDto,
						LocationRequest.BODY
					),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.update(req, res, next)
		);
		this.router.post(
			'/users',
			[
					this.middleware.validarDto(
						SchemaDto.UPDATE,
						UpdateUserDto,
						LocationRequest.BODY
					),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.create(req, res, next)
		);
		this.router.delete(
			'/users/:id',
			[
				(req: Request, res: Response, next: NextFunction) =>
					this.middleware.validateUUID(req, res, next),
			],
			(req: Request, res: Response, next: NextFunction) =>
				this.controller.delete(req, res, next)
		);
	}
}
