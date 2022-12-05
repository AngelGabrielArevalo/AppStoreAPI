import { JoiSchema } from 'joi-class-decorators';
import Joi from 'joi';
import { Rol } from '../../common/types/types';

export class UpdateUserDto {
	@JoiSchema(['UPDATE'], Joi.string().optional())
	name?: string;

	@JoiSchema(['UPDATE'], Joi.string().optional())
	lastName?: string;

	@JoiSchema(['UPDATE'], Joi.string().optional())
	userName?: string;

	@JoiSchema(['UPDATE'], Joi.string().email().optional())
	email?: string;

	@JoiSchema(['UPDATE'], Joi.string().optional())
	password?: string;

	@JoiSchema(['UPDATE'], Joi.string().optional())
	city?: string;

	@JoiSchema(['UPDATE'], Joi.string().optional())
	province?: string;

	@JoiSchema(['UPDATE'], Joi.string().valid(...Object.values(Rol)).optional())
	role?: Rol;

	updatedAt?: Date;
}
