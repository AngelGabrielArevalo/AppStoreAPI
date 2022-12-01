import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/customer.entity';
import { StatusCodes } from 'http-status-codes';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { DeleteResult } from 'typeorm';

export class CustomerController {
	constructor(private readonly customerService: CustomerService = new CustomerService()) {}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const customers: Customer[] = await this.customerService.findAll();

		res.status(StatusCodes.OK).json(customers);
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;

			const customer: Customer | undefined = await this.customerService.findById(id);

			res.status(StatusCodes.OK).json(customer);
		} catch (error: any) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const createCustomerDto: CreateCustomerDto = req.body;

			const newCustomer: Customer | undefined = await this.customerService.create(
				createCustomerDto
			);

			res.status(StatusCodes.CREATED).json(newCustomer);
		} catch (error: any) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const updateCustomerDto: UpdateCustomerDto = req.body;

			const customerUpdated: Customer | undefined = await this.customerService.update(
				id,
				updateCustomerDto
			);

			res.status(StatusCodes.OK).json(customerUpdated);
		} catch (error: any) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;

			const resultDelete: DeleteResult | undefined = await this.customerService.delete(id);

			res.status(StatusCodes.OK).json(resultDelete);
		} catch (error: any) {
			next(error);
		}
	}
}
