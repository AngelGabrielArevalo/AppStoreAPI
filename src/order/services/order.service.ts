import { Order } from '../entities/order.entity';
import { BaseService } from '../../common/services/base.service';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import boom from '@hapi/boom';
import { httpCrudOrderMessages } from '../utils/responses';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { errorsDBHandlerException } from '../../common/utils/functions';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { Customer } from '../../customer/entities/customer.entity';

export class OrderService extends BaseService<Order> {
	private orderRepository: Repository<Order>;
	constructor() {
		super(Order);
		this.orderRepository = this.getRepository();
	}

	async findAll(): Promise<Order[]> {
		const orders: Order[] = await this.orderRepository.find({ loadRelationIds: true });
		return orders;
	}

	async findById(id: string): Promise<Order | undefined> {
		const order: Order | null = await this.orderRepository.findOne({
			where: { id: id },
			relations: ['customerId'],
		});

		if (!order) {
			throw boom.notFound(httpCrudOrderMessages.noExistForById);
		}

		return order;
	}

	async create(createOrderDto: CreateOrderDto): Promise<Order | undefined> {
		try {
			const newOrder: Order = this.orderRepository.create(createOrderDto);

			return await this.orderRepository.save(newOrder);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | undefined> {
		try {
			updateOrderDto.updatedAt = new Date();
			const result: UpdateResult = await this.orderRepository.update(id, updateOrderDto);
			if (result.affected === 0) {
				throw boom.badRequest(httpCrudOrderMessages.errorAlActualizar);
			}

			return this.findById(id);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async delete(id: string): Promise<DeleteResult | undefined> {
		const result: DeleteResult = await this.orderRepository.delete(id);

		if (result.affected === 0) {
			throw boom.badRequest(httpCrudOrderMessages.errorAlEliminar);
		}

		return result;
	}
}
