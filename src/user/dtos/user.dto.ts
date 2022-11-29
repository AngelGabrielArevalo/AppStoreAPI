import { JoiSchema } from 'joi-class-decorators';
import Joi from 'joi';
import { Rol } from '../../common/types/types';

export class UserDto {
	@JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	name?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	lastName?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	userName?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	email?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	password?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	city?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	province?: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	@JoiSchema(['UPDATE'], Joi.string().optional())
	role?: Rol;

	updatedAt?: Date;
}
