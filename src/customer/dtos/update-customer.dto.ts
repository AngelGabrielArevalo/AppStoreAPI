import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";


export class UpdateCustomerDto {
    @JoiSchema(['UPDATE'], Joi.string().required())
	adress?: string;

    @JoiSchema(['UPDATE'], Joi.string().length(10).pattern(/^[0-9]+$/).required())
	phone?: string;

    @JoiSchema(['UPDATE'], Joi.string().length(8).pattern(/^[0-9]+$/).required())
	dni?: string;

    updatedAt?: Date;
}