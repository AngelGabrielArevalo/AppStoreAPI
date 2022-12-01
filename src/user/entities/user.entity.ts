import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Rol } from '../../common/types/types';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column()
	name!: string;

	@Column()
	lastName!: string;

	@Column()
	userName!: string;

	@Column({
		unique: true,
	})
	email!: string;

	@Column({
		select: false,
	})
	password?: string;

	@Column()
	city!: string;

	@Column()
	province!: string;

	@Column({ type: 'enum', enum: Rol, nullable: false })
	role!: Rol;

	@Column({
		nullable: true,
		default: null,
	})
	recoveryToken!: string;

}
