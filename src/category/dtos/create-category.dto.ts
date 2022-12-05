import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";

export class CreateCategoryDto {
    @JoiSchema(['CREATE'], Joi.string().required())
    name!: string;

    @JoiSchema(['CREATE'], Joi.string().required())
	image!: string;
}