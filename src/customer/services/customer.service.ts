import { QueryFailedError, Repository } from 'typeorm';
import { BaseService } from '../../common/services/base.service';
import { Customer } from '../entities/customer.entity';
import boom from '@hapi/boom';
import { httpCrudCustomerMessages } from '../utils/responses';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { handleDBEcpection } from '../../common/utils/functions';

export class CustomerService extends BaseService<Customer> {
	private customerRepository: Repository<Customer>;

	constructor() {
		super(Customer);
		this.customerRepository = this.getRepository();
	}

	async findAll(): Promise<Customer[]> {
		const customers: Customer[] = await this.customerRepository.find();

		return customers;
	}

	async findById(id: string): Promise<Customer | null> {
		const customer: Customer | null = await this.customerRepository.findOneBy({ id });
        if(!customer) {
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
}
