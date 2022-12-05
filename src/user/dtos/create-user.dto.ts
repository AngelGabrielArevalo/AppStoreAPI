import { JoiSchema } from 'joi-class-decorators';
import Joi from 'joi';
import { Rol } from '../../common/types/types';

export class CreateUserDto {
	@JoiSchema(['CREATE'], Joi.string().required())
	name!: string;

	@JoiSchema(['CREATE'], Joi.string().required())
	lastName!: string;

	@JoiSchema(['CREATE'], Joi.string().required())
	userName!: string;

	@JoiSchema(['CREATE'], Joi.string().email().required())
	email!: string;

	@JoiSchema(['CREATE'], Joi.string().required())
	password!: string;

	@JoiSchema(['CREATE'], Joi.string().required())
	city!: string;

	@JoiSchema(['CREATE'], Joi.string().required())
	province!: string;

	@JoiSchema(['CREATE'], Joi.string().valid(...Object.values(Rol)).required())
	role!: Rol;

	updatedAt?: Date;
}
