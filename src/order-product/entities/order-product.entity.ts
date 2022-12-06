import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'orders-products' })
export class OrderProduct extends BaseEntity {
	@ManyToOne(() => Order, order => order.orderProducts, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'order_id' })
	orderId!: Order;

	@ManyToOne(() => Product, product => product.orderProducts, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'product_id' })
	productId!: Product;

	@Column()
	amount!: number;
}
