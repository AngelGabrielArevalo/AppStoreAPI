import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
	@Column('varchar', {
		unique: true,
	})
	name!: string;

	@Column()
	image!: string;
}
