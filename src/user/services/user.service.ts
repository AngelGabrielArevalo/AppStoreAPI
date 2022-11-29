import { BaseService } from '../../common/services/base.service';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import boom from '@hapi/boom';
import { httpCrudUserMessages } from '../utils/responses';
import { handleDBEcpection } from '../utils/functions';

export class UserService extends BaseService<User> {
	private userRepository: Repository<User>;

	constructor() {
		super(User);
		this.userRepository = this.getRepository();
	}

	async findAll(): Promise<User[]> {
		const users: User[] = await this.userRepository.find();
		return users;
	}

	async findById(id: string): Promise<User | null> {
		const user: User | null = await this.userRepository.findOneBy({ id });
		if (!user) {
			throw boom.notFound(httpCrudUserMessages.noExisteUsuarioConId);
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user: User | null = await this.userRepository
			.createQueryBuilder('user')
			.where({ email })
			.addSelect('user.password')
			.getOne();

		if (!user) {
			throw boom.notFound(httpCrudUserMessages.noExisteUsuarioConMail);
		}

		return user;
	}

	async create(userDto: UserDto): Promise<User | undefined> {
		try {
			const newUser = this.userRepository.create(userDto);

			const user: User = await this.userRepository.save(newUser);

			return user;
		} catch (error: any) {
			handleDBEcpection(error);
		}
	}

	async update(id: string, userDto: UserDto): Promise<User | null> {
		userDto.updatedAt = new Date();
		const result: UpdateResult = await this.userRepository.update(id, userDto);

		if (result.affected === 0) {
			throw boom.badRequest(httpCrudUserMessages.errorAlActualizar);
		}

		return this.findById(id);
	}

	async delete(id: string): Promise<DeleteResult | null> {
		const result: DeleteResult = await this.userRepository.delete(id);

		if (result.affected === 0) {
			throw boom.badRequest(httpCrudUserMessages.errorAlEliminar);
		}

		return result;
	}
}
