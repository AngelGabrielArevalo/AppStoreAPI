import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

export class UpdateOrderProductDto {
    @JoiSchema(['UPDATE'], Joi.string().guid().required())
    orderId?: Order;

    @JoiSchema(['UPDATE'], Joi.string().guid().required())
    productId?: Product;

    @JoiSchema(['UPDATE'], Joi.number().required())
    amount?: number;

    updatedAt?: Date;
}