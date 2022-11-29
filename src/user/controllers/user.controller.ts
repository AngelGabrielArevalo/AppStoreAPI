import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { StatusCodes } from 'http-status-codes';
import { UserDto } from '../dtos/user.dto';
import { DeleteResult } from 'typeorm';
export class UserController {
	constructor(private readonly userService: UserService = new UserService()) {}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const users: User[] = await this.userService.findAll();

		res.status(StatusCodes.OK).json(users);
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const user: User | null = await this.userService.findById(id);

			res.status(StatusCodes.OK).json(user);
		} catch (error: any) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userDto: UserDto = req.body;
			const newUser = await this.userService.create(userDto);

			res.status(StatusCodes.CREATED).json(newUser);
		} catch (error: any) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const userChanges: UserDto = req.body;

			const userUpdate: User | null = await this.userService.update(id, userChanges);

			res.status(StatusCodes.OK).json(userUpdate);
		} catch (error: any) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;

			const deleteResult: DeleteResult | null = await this.userService.delete(id);

			res.status(StatusCodes.OK).json(deleteResult);
		} catch (error: any) {
			next(error);
		}
	}
}
