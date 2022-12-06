import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
    @JoiSchema(['CREATE'], Joi.string().required())
    name!: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    description!: string;

    @JoiSchema(['CREATE'], Joi.number().required())
    price!: number;

    @JoiSchema(['CREATE'], Joi.string().required())
	image!: string;

    @JoiSchema(['CREATE'], Joi.string().guid().required())
	categoryId!: Category;
}