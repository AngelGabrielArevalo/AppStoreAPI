import { JoiSchema } from 'joi-class-decorators';
import { Customer } from '../../customer/entities/customer.entity';
import Joi from 'joi';

export class CreateOrderDto {
    @JoiSchema(['CREATE'], Joi.string().required())
    customerId!: Customer;
}