import { User } from '../../../src/user/entities/user.entity';
import { UserService } from '../../../src/user/services/user.service';
import { Rol } from '../../../src/common/types/types';
import { DeleteResult } from 'typeorm';
import boom from '@hapi/boom';
import { httpCrudUserMessages } from '../../../src/user/utils/responses';
import { getQuery } from '../../configuration/getQuery';
import { CreateUserDto } from '../../../src/user/dtos/create-user.dto';
import { UpdateUserDto } from '../../../src/user/dtos/update-user.dto';
import { ConfigServer } from '../../../src/configuration/configServer';

describe('Test UserService', () => {
	const userService = new UserService();
	const configServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});

	afterEach(async () => {
		await configServer.dropDBAndDisconect();
	});

	test('findAll_conUsersExistentes_retornaArrayDeUsers', async () => {
		const users: User[] = await userService.findAll();

		expect(users).not.toBeNull();
		expect(users.length).toBe(4);
	});

	test('findBy_conIdExistente_retornaUser', async () => {
		const id: string = '1c3e1c21-9bae-4049-8473-2e36578377be';
		const user: User | null = await userService.findById(id);

		expect(user).not.toBeNull();
		expect(user?.name).toBe('Angel');
	});

	test('findById_conIdInexistente_lanzaExcepcionBoomNotFound', async () => {
		const id: string = '1c3e1c33-9bae-4049-8473-2e36578377be';

		await expect(userService.findById(id)).rejects.toThrow(
			boom.notFound(httpCrudUserMessages.noExisteUsuarioConId)
		);
	});

	test('create_conParametrosValidos_guardaUser', async () => {
		const createUserDto: CreateUserDto = {
			name: 'Pedro',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: '123456@gmail.com',
			password: '1234',
			city: 'bsas',
			province: 'province',
			role: Rol.ADMIN,
		};

		const newUser: User | undefined = await userService.create(createUserDto);

		expect(newUser instanceof User).toBeTruthy();
		expect(newUser?.name).toBe(createUserDto.name);
	});

	test('create_conParametrosInvalidos_lanzaExcepcion', async () => {
		const createUserDto: CreateUserDto = {
			name: 'Pedro',
			lastName: 'Fernandez',
			userName: 'pedrito',
			email: 'angel@gmail.com',
			password: '1234',
			city: 'bsas',
			province: 'province',
			role: Rol.ADMIN,
		};

		await expect(userService.create(createUserDto)).rejects.toThrow(
			boom.badRequest('Key (email)=(angel@gmail.com) already exists.')
		);
	});

	test('update_conIdExistenteYParametrosValidos_actualizaUser', async () => {
		const id: string = '1c3e1c21-9bae-4049-8473-2e36578377be';
		const fechaDeHoy: Date = new Date();
		const updateUserDto: UpdateUserDto = {
			name: 'Felipe',
			updatedAt: fechaDeHoy,
		};

		const user: User | null = await userService.update(id, updateUserDto);

		expect(user).not.toBeNull();
		expect(user?.name).toBe('Felipe');
		expect(user?.updatedAt.setHours(0, 0, 0, 0)).toBe(fechaDeHoy.setHours(0, 0, 0, 0));
	});

	test('update_conParametrosInvalidos_lanzaExcepcion', async () => {
		const id: string = '8c3e1c21-9bae-4049-8473-2e36578377be';
		const updateUserDto: UpdateUserDto = {
			name: 'Felipe',
		};

		await expect(userService.update(id, updateUserDto)).rejects.toThrow(
			boom.badRequest(httpCrudUserMessages.errorAlActualizar)
		);
	});

	test('delete_conIdExistente_eliminaUser', async () => {
		const id = '1c3e1c21-9bae-4049-8473-2e36578377be';

		const result: DeleteResult | null = await userService.delete(id);

		expect(result).not.toBeNull();
		expect(result?.affected).toBe(1);
	});

	test('delete_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '8c3e1c21-9bae-4049-8473-2e36578377be';

		await expect(userService.delete(id)).rejects.toThrow(httpCrudUserMessages.errorAlEliminar);
	});

	test('findByEmail_conEmailExistente_retornaUser', async () => {
		const email: string = 'angel@gmail.com';

		const user: User | null = await userService.findByEmail(email);

		expect(user).not.toBeNull();
		expect(user?.password).toBeDefined();
	});

	test('findByEmail_conEmailInexistente_lanzaExcepcionBoomNotFound', async () => {
		const email: string = 'notFound';

		await expect(userService.findByEmail(email)).rejects.toThrow(
			boom.notFound(httpCrudUserMessages.noExisteUsuarioConMail)
		);
	});
});
