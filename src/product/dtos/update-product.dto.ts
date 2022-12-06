import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";
import { Category } from '../../category/entities/category.entity';

export class UpdateProductDto {
    @JoiSchema(['UPDATE'], Joi.string().optional())
    name?: string;

    @JoiSchema(['UPDATE'], Joi.string().optional())
    description?: string;

    @JoiSchema(['UPDATE'], Joi.number().optional())
    price?: number;

    @JoiSchema(['UPDATE'], Joi.string().optional())
	image?: string;

    @JoiSchema(['UPDATE'], Joi.string().optional())
    categoryId?: Category;

    updatedAt?: Date;
}