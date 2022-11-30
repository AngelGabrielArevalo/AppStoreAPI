import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";
import { User } from "../../user/entities/user.entity";

export class CreateCustomerDto {
    @JoiSchema(['CREATE'], Joi.string().guid().required())
    userId!: User;

    @JoiSchema(['CREATE'], Joi.string().required())
	adress!: string;

    @JoiSchema(['CREATE'], Joi.string().length(10).pattern(/^[0-9]+$/).required())
	phone!: string;

    @JoiSchema(['CREATE'], Joi.string().length(8).pattern(/^[0-9]+$/).required())
	dni!: string;
}
