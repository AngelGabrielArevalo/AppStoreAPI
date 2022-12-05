import { CustomerService } from '../../../src/customer/services/customer.service';
import { ConfigServer } from '../../../src/configuration/configServer';
import { getQuery } from '../../configuration/getQuery';
import { Customer } from '../../../src/customer/entities/customer.entity';
import { httpCrudCustomerMessages } from '../../../src/customer/utils/responses';
import { CreateCustomerDto } from '../../../src/customer/dtos/create-customer.dto';
import { User } from '../../../src/user/entities/user.entity';
import { UpdateCustomerDto } from '../../../src/customer/dtos/update-customer.dto';
import boom from '@hapi/boom';
import { DeleteResult } from 'typeorm';

describe('Test CustomerService', () => {
	jest.setTimeout(60000);
	const customerService = new CustomerService();
	const configServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});
	afterEach(async () => {
		await configServer.clearDBAndDisconect();
	});

	test('findAll_conCustomersExistentes_retornaArrayDeCustomers', async () => {
		const customers: Customer[] = await customerService.findAll();

		expect(customers).not.toBeNull();
		expect(customers.length).toBe(3);
	});

	test('findByID_conIdExistente_retornaCustomer', async () => {
		const id = '2c3e1c21-9bae-4049-8473-2e36578377be';
		const customer: Customer | undefined = await customerService.findById(id);

		expect(customer).not.toBeNull();
		expect(customer?.adress).toBe('AvenidaX123');
	});

	test('findByID_conIdInexistente_lanzaExcepcion', async () => {
		const id = '0c3e1c21-9bae-4049-8473-2e36578377be';

		await expect(customerService.findById(id)).rejects.toThrow(
			httpCrudCustomerMessages.noExisrForId
		);
	});

	test('create_conParametrosValidos_guardaCustomer', async () => {
		const createCustomerDto: CreateCustomerDto = {
			userId: '1c9e1c44-9bae-4049-8475-2e36578377be' as unknown as User,
			adress: 'Roma 123',
			dni: '43987654',
			phone: '1512345432',
		};

		const newCustomer: Customer | undefined = await customerService.create(createCustomerDto);

		expect(newCustomer).not.toBeNull();
		expect(newCustomer?.adress).toBe(createCustomerDto.adress);
	});

	test('create_conIdDeUserInexistente_lanzaExcepcion', async () => {
		const createCustomerDto: CreateCustomerDto = {
			userId: '1c9e1c44-9bae-4049-8433-2e36578377be' as unknown as User,
			adress: 'Roma 123',
			dni: '43987654',
			phone: '1512345432',
		};

		await expect(customerService.create(createCustomerDto)).rejects.toThrow(
			'Key (user_id)=(1c9e1c44-9bae-4049-8433-2e36578377be) is not present in table "users".'
		);
	});

	test('create_conIdDeUserExistenteEnOtroCustomer_lanzaExcepcion', async () => {
		const createCustomerDto: CreateCustomerDto = {
			userId: '1c3e1c21-9bae-4049-8473-2e36578377be' as unknown as User,
			adress: 'Roma 123',
			dni: '43987654',
			phone: '1512345432',
		};

		await expect(customerService.create(createCustomerDto)).rejects.toThrow(
			'Key (user_id)=(1c3e1c21-9bae-4049-8473-2e36578377be) already exists.'
		);
	});

	test('update_conIdExistente_actualizaCutomer', async () => {
		const id: string = '2c3e1c21-9bae-4049-8473-2e36578377be';
		const updateCustomerDto: UpdateCustomerDto = {
			adress: 'Springfild 1234',
		};
		const fechaDeHoy: Date = new Date();

		const customerUpdate: Customer | undefined = await customerService.update(
			id,
			updateCustomerDto
		);

		expect(customerUpdate).not.toBeNull();
		expect(customerUpdate?.adress).toBe(updateCustomerDto.adress);
		expect(customerUpdate?.updatedAt.setHours(0, 0, 0, 0)).toBe(
			fechaDeHoy.setHours(0, 0, 0, 0)
		);
	});

	test('update_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '8c8e1c81-9bae-4049-8473-2e36578377be';
		const updateCustomerDto: UpdateCustomerDto = {
			adress: 'Springfild 1234',
		};

		await expect(customerService.update(id, updateCustomerDto)).rejects.toThrow(
			httpCrudCustomerMessages.errorAlActualizar
		);
	});

	test('delete_conIdExistente_eliminaCustomer', async () => {
		const id: string = '2c3e1c21-9bae-4049-8473-2e36578377be';

		const resultDelete: DeleteResult | undefined = await customerService.delete(id);

		expect(resultDelete!.affected).toBe(1);
	});

	test('delete_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '9c9e9c21-9bae-4049-8473-2e36578377be';

		await expect(customerService.delete(id)).rejects.toThrow(
			httpCrudCustomerMessages.errorAlEliminar
		);
	});
});
