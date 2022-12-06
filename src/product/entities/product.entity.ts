import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Category } from '../../category/entities/category.entity';
import { OrderProduct } from '../../order-product/entities/order-product.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column()
	price!: number;

	@Column()
	image!: string;

	@ManyToOne(() => Category, category => category.products, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
	@JoinColumn({ name: 'category_id' })
	categoryId!: Category;

	@OneToMany(() => OrderProduct, orderProduct => orderProduct.productId)
	orderProducts?: OrderProduct[];
}
