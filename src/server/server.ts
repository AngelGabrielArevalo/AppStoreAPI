import 'reflect-metadata';
import express, { Application, Router } from 'express';
import { ConfigServer } from '../configuration/configServer';
import { UserRouter } from '../user/user.router';
import morgan from 'morgan';
import cors from 'cors';
import { ErrorHandlerMiddleware } from '../common/middlewares/errorHandler.middleware';
import { CustomerRouter } from '../customer/customer.router';
import { CategoryRouter } from '../category/category.router';
import { ProductRouter } from '../product/product.router';
import { OrderRouter } from '../order/order.router';
import { OrderProductRouter } from '../order-product/order-product.router';
import { seedRouter } from '../seed/seedControllers';

export class ServerBootstrap extends ConfigServer {
	public app: Application;
	private port: number;

	constructor() {
		super();
		this.app = express();
		this.port = this.getNumberEnvironments('PORT') || 3000;
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(morgan('dev'));
		this.app.use(cors());

		this.app.use('/api/v1', this.routers());

		this.app.use(ErrorHandlerMiddleware.errorHandler);
	}

	routers(): Array<Router> {
		return [
			new UserRouter().router,
			new CustomerRouter().router,
			new CategoryRouter().router,
			new ProductRouter().router,
			new OrderRouter().router,
			new OrderProductRouter().router,
			seedRouter
		];
	}

	async dbConnect(): Promise<void> {
		try {
			await this.initDataBaseConecction();
			console.log('Conectado a la base de datos');
		} catch (error) {
			console.log(error);
			console.error('Error al conectarse a la base de datos');
		}
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log('Server listening on port ' + this.port);
		});
	}
}
