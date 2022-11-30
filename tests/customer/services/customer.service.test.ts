import { CustomerService } from '../../../src/customer/services/customer.service';
import { ConfigServer } from '../../../src/configuration/configServer';
import { getQuery } from '../../configuration/getQuery';
import { Customer } from '../../../src/customer/entities/customer.entity';
import { AppDataSource } from '../../../src/configuration/database/data.source';
import { httpCrudCustomerMessages } from '../../../src/customer/utils/responses';
import { CreateCustomerDto } from '../../../src/customer/dtos/create-customer.dto';
import { User } from '../../../src/user/entities/user.entity';

describe('Test CustomerService', () => {
	const customerService = new CustomerService();
	const configServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});

	afterEach(async () => {
		await configServer.dropDBAndDisconect();
	});

	test('findAll_conCustomersExistentes_retornaArrayDeCustomers', async () => {
		const customers: Customer[] = await customerService.findAll();

		expect(customers).not.toBeNull();
		expect(customers.length).toBe(3);
	});

	test('findByID_conIdExistente_retornaCustomer', async () => {
		const id = '2c3e1c21-9bae-4049-8473-2e36578377be';
		const customer: Customer | null = await customerService.findById(id);

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

	test('create_conParametrosInvalidos_lanzaExcepcion', async () => {
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
});
