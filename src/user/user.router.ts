import { Response, NextFunction, Request } from 'express';
import { BaseRouter } from '../common/router/base.touter';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
	constructor() {
		super(UserController, UserMiddleware);
	}

	routes(): void {
		this.router.get('/users', (req: Request, res: Response, next: NextFunction) =>
			this.controller.findAll(req, res, next)
		);
	}
}
