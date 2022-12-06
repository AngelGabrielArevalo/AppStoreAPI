import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

export class CreateOrderProductDto {
    @JoiSchema(['CREATE'], Joi.string().guid().required())
    orderId!: Order;

    @JoiSchema(['CREATE'], Joi.string().guid().required())
    productId!: Product;

    @JoiSchema(['CREATE'], Joi.number().required())
    amount!: number;
}