import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
	@Column('varchar', {
		unique: true,
	})
	name!: string;

	@Column()
	image!: string;

	@OneToMany(() => Product, product => product.categoryId)
	products?: Product[];
}
