import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { OrderProduct } from '../../order-product/entities/order-product.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
	@ManyToOne(() => Customer, customer => customer.orders, {
		nullable: false,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'customer_id' })
	customerId!: Customer;

	@OneToMany(() => OrderProduct, orderProduct => orderProduct.orderId)
	orderProducts?: OrderProduct[];
}
