import { DeleteResult, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { BaseService } from '../../common/services/base.service';
import { Customer } from '../entities/customer.entity';
import boom from '@hapi/boom';
import { httpCrudCustomerMessages } from '../utils/responses';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { handleDBEcpection } from '../../common/utils/functions';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

export class CustomerService extends BaseService<Customer> {
	private customerRepository: Repository<Customer>;

	constructor() {
		super(Customer);
		this.customerRepository = this.getRepository();
	}

	async findAll(): Promise<Customer[]> {
		const customers: Customer[] = await this.customerRepository.find({
			relations: ['userId'],
		});

		return customers;
	}

	async findById(id: string): Promise<Customer | undefined> {
		const customer: Customer | null = await this.customerRepository.findOneBy({ id });
		if (!customer) {
			throw boom.notFound(httpCrudCustomerMessages.noExisrForId);
		}

		return customer;
	}

	async create(createCustomerDto: CreateCustomerDto): Promise<Customer | undefined> {
		try {
			const newCustomer: Customer = this.customerRepository.create(createCustomerDto);
			await this.customerRepository.save(newCustomer);

			return newCustomer;
		} catch (error: any) {
			handleDBEcpection(error);
		}
	}

	async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer | undefined> {
		updateCustomerDto.updatedAt = new Date();
		const resultUpdate: UpdateResult = await this.customerRepository.update(
			id,
			updateCustomerDto
		);
		if (!resultUpdate.affected) {
			throw boom.badRequest(httpCrudCustomerMessages.errorAlActualizar);
		}

		const customer = await this.findById(id);

		return customer;
	}

	async delete(id: string): Promise<DeleteResult | undefined> {
		const resultDelete: DeleteResult = await this.customerRepository.delete(id);
		if (!resultDelete.affected) {
			throw boom.badRequest(httpCrudCustomerMessages.errorAlEliminar);
		}

		return resultDelete;
	}
}
