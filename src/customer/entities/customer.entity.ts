import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
	@OneToOne(() => User, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id' })
	userId!: User;

	@Column()
	adress!: string;

	@Column('varchar', { length: 10 })
	phone!: string;

	@Column('varchar', { unique: true, length: 10 })
	dni!: string;

	@OneToMany(() => Order, order => order.customerId)
	orders?: Order[];
}
