import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";

export class UpdateCategoryDto {
    @JoiSchema(['UPDATE'], Joi.string().guid().required())
    name?: string;

    @JoiSchema(['UPDATE'], Joi.string().required())
	image?: string;
}