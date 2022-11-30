import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
	@OneToOne(() => User, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
	@JoinColumn({ name: 'user_id' })
	userId!: User;

	@Column()
	adress!: string;

	@Column('varchar', { length: 10 })
	phone!: string;

	@Column('varchar', { length: 10 })
	dni!: string;
}
