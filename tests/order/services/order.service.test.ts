import { OrderService } from '../../../src/order/services/order.service';
import { ConfigServer } from '../../../src/configuration/configServer';
import { getQuery } from '../../configuration/getQuery';
import { Order } from '../../../src/order/entities/order.entity';
import { httpCrudOrderMessages } from '../../../src/order/utils/responses';
import { CreateOrderDto } from '../../../src/order/dtos/create-order.dto';
import { UpdateOrderDto } from '../../../src/order/dtos/update-order.dto';
import { DeleteResult } from 'typeorm';
import { Customer } from '../../../src/customer/entities/customer.entity';

describe('Tests Order Service', () => {
	jest.setTimeout(60000);
	const orderService: OrderService = new OrderService();
	const configServer: ConfigServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});
	afterEach(async () => {
		await configServer.clearDBAndDisconect();
	});

	test('findAll_conOrdersExistentes_retornaArrayDeOrders', async () => {
		const orders: Order[] = await orderService.findAll();

		expect(orders).not.toBeNull();
		expect(orders.length).toBe(3);
	});

	test('findById_conIdExistente_retornaOrder', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';

		const order: Order | undefined = await orderService.findById(id);

		expect(order).not.toBeUndefined();
		expect(order?.customerId.id).toBe('2c3e1c21-9bae-4049-8473-2e36578377be');
	});

	test('findById_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '9c9e1c32-9bae-4049-8473-2e36578377be';

		await expect(orderService.findById(id)).rejects.toThrow(
			httpCrudOrderMessages.noExistForById
		);
	});

	test('create_conParametrosValidos_guardaOrder', async () => {
		const createOrderDto: CreateOrderDto = {
			customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};

		const newOrder: Order | undefined = await orderService.create(createOrderDto);

		expect(newOrder).not.toBeUndefined();
		expect(newOrder?.customerId).toBe(createOrderDto.customerId);
	});

	test('create_conNameExistente_lanzaExcepcion', async () => {
		const createOrderDto: CreateOrderDto = {
			customerId: '8c8e8c88-9bae-4049-8473-8e38888387be' as unknown as Customer,
		};

		await expect(orderService.create(createOrderDto)).rejects.toThrow(
			'Key (customer_id)=(8c8e8c88-9bae-4049-8473-8e38888387be) is not present in table "customers".'
		);
	});

	test('update_conParametrosValidos_actualizaOrder', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderDto: UpdateOrderDto = {
			customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};

		const orderUpdated: Order | undefined = await orderService.update(id, updateOrderDto);

		expect(orderUpdated?.customerId.id).toBe(updateOrderDto.customerId);
	});

	test('update_conCustomerIdInexistente_lanzaExcepcion', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderDto: UpdateOrderDto = {
			customerId: '8c8e8c88-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};

		await expect(orderService.update(id, updateOrderDto)).rejects.toThrow(
			'Key (customer_id)=(8c8e8c88-9bae-4049-8473-2e36578377be) is not present in table "customers".'
		);
	});

	test('update_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '7c7e1c77-9bae-4049-8473-2e36578377be';
		const updateOrderDto: UpdateOrderDto = {
			customerId: '2c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Customer,
		};

		await expect(orderService.update(id, updateOrderDto)).rejects.toThrow(
			httpCrudOrderMessages.errorAlActualizar
		);
	});

	test('delete_conIdExistente_eliminaCategoria', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';

		const resultDelete: DeleteResult | undefined = await orderService.delete(id);

		expect(resultDelete).not.toBeUndefined();
		expect(resultDelete?.affected).toBe(1);
	});

	test('delete_conIdInexistente_lanzaExecpcion', async () => {
		const id: string = '7c3e1c77-7bae-4049-8473-2e36578377be';

		await expect(orderService.delete(id)).rejects.toThrow(httpCrudOrderMessages.errorAlEliminar);
	});
});
