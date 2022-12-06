import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import { Customer } from '../../customer/entities/customer.entity';

export class UpdateOrderDto {
    @JoiSchema(['UPDATE'], Joi.string().guid().optional())
    customerId!: Customer;

    updatedAt?: Date;
}