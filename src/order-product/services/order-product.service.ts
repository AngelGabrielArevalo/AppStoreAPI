import { OrderProduct } from '../entities/order-product.entity';
import { BaseService } from '../../common/services/base.service';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import boom from '@hapi/boom';
import { httpCrudOrderProductMessages } from '../utils/responses';
import { CreateOrderProductDto } from '../dtos/create-order-product.dto';
import { errorsDBHandlerException } from '../../common/utils/functions';
import { UpdateOrderProductDto } from '../dtos/update-order-product.dto';

export class OrderProductService extends BaseService<OrderProduct> {
	private orderProductRepository: Repository<OrderProduct>;
	constructor() {
		super(OrderProduct);
		this.orderProductRepository = this.getRepository();
	}

	async findAll(): Promise<OrderProduct[]> {
		const orderProducts: OrderProduct[] = await this.orderProductRepository.find({
			relations: {
				productId: {
					categoryId: true,
				},
				orderId: {
					customerId: {
						userId: true
					},
				},
			},
		});
		return orderProducts;
	}

	async findById(id: string): Promise<OrderProduct | undefined> {
		const orderProduct: OrderProduct | null = await this.orderProductRepository.findOne({
			where: { id: id },
			relations: {
				productId: {
					categoryId: true,
				},
				orderId: {
					customerId: {
						userId: true
					},
				},
			},
		});
		if (!orderProduct) {
			throw boom.notFound(httpCrudOrderProductMessages.noExistForId);
		}

		return orderProduct;
	}

	async create(createOrderProductDto: CreateOrderProductDto): Promise<OrderProduct | undefined> {
		try {
			const newOrderProduct: OrderProduct =
				this.orderProductRepository.create(createOrderProductDto);

			return await this.orderProductRepository.save(newOrderProduct);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async update(
		id: string,
		updateOrderProductDto: UpdateOrderProductDto
	): Promise<OrderProduct | undefined> {
		try {
			updateOrderProductDto.updatedAt = new Date();
			const result: UpdateResult = await this.orderProductRepository.update(
				id,
				updateOrderProductDto
			);
			if (result.affected === 0) {
				throw boom.badRequest(httpCrudOrderProductMessages.errorAlActualizar);
			}

			return this.findById(id);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async delete(id: string): Promise<DeleteResult | undefined> {
		const result: DeleteResult = await this.orderProductRepository.delete(id);
		if (result.affected === 0) {
			throw boom.badRequest(httpCrudOrderProductMessages.errorAlEliminar);
		}

		return result;
	}
}
