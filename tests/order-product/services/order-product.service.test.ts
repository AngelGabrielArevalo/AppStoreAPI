import { OrderProductService } from '../../../src/order-product/services/order-product.service';
import { ConfigServer } from '../../../src/configuration/configServer';
import { getQuery } from '../../configuration/getQuery';
import { OrderProduct } from '../../../src/order-product/entities/order-product.entity';
import { httpCrudOrderProductMessages } from '../../../src/order-product/utils/responses';
import { CreateOrderProductDto } from '../../../src/order-product/dtos/create-order-product.dto';
import { UpdateOrderProductDto } from '../../../src/order-product/dtos/update-order-product.dto';
import { DeleteResult } from 'typeorm';
import { Customer } from '../../../src/customer/entities/customer.entity';
import { Order } from '../../../src/order/entities/order.entity';
import { Product } from '../../../src/product/entities/product.entity';

describe('Tests OrderProduct Service', () => {
	jest.setTimeout(60000);
	const orderProductService: OrderProductService = new OrderProductService();
	const configServer: ConfigServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});
	afterEach(async () => {
		await configServer.clearDBAndDisconect();
	});

	test('findAll_conOrderProductsExistentes_retornaArrayDeOrderProducts', async () => {
		const orderProducts: OrderProduct[] = await orderProductService.findAll();

		expect(orderProducts).not.toBeNull();
		expect(orderProducts.length).toBe(2);
	});

	test('findById_conIdExistente_retornaOrderProduct', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';

		const orderProduct: OrderProduct | undefined = await orderProductService.findById(id);

		expect(orderProduct).not.toBeUndefined();
		expect(orderProduct?.orderId.id).toBe('5c4e1c21-9bae-4049-8473-2e36578377be');
		expect(orderProduct?.productId.id).toBe('5c4e1c21-9bae-4049-8473-2e36578377be');
	});

	test('findById_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '9c9e1c32-9bae-4049-8473-2e36578377be';

		await expect(orderProductService.findById(id)).rejects.toThrow(
			httpCrudOrderProductMessages.noExistForId
		);
	});

	test('create_conParametrosValidos_guardaOrderProduct', async () => {
		const createOrderProductDto: CreateOrderProductDto = {
			productId: '8c4e1c21-9bae-4049-8473-2e36578377be' as unknown as Product,
			orderId: '4c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Order,
			amount: 10,
		};

		const newOrderProduct: OrderProduct | undefined = await orderProductService.create(
			createOrderProductDto
		);

		expect(newOrderProduct).not.toBeUndefined();
		expect(newOrderProduct?.orderId).toBe(createOrderProductDto.orderId);
	});

	test('create_conIdInexistente_lanzaExcepcion', async () => {
		const createOrderProductDto: CreateOrderProductDto = {
			productId: '9c9e9c99-9bae-9949-8473-2e36578377be' as unknown as Product,
			orderId: '4c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Order,
			amount: 10,
		};

		await expect(orderProductService.create(createOrderProductDto)).rejects.toThrow(
			'Key (product_id)=(9c9e9c99-9bae-9949-8473-2e36578377be) is not present in table "products".'
		);
	});

	test('update_conParametrosValidos_actualizaOrderProduct', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const updateOrderProductDto: UpdateOrderProductDto = {
			amount: 20,
		};

		const orderProductUpdated: OrderProduct | undefined = await orderProductService.update(
			id,
			updateOrderProductDto
		);

		expect(orderProductUpdated?.amount).toBe(updateOrderProductDto.amount);
	});

	test('update_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '9c9e9c99-9bae-4049-8473-2e36578377be';
		const updateOrderProductDto: UpdateOrderProductDto = {
			amount: 12,
		};

		await expect(orderProductService.update(id, updateOrderProductDto)).rejects.toThrow(
			httpCrudOrderProductMessages.errorAlActualizar
		);
	});

	test('update_conProductIdInexistente_lanzaExcepcion', async () => {
		const id: string = '7c7e1c77-9bae-4049-8473-2e36578377be';
		const updateOrderProductDto: UpdateOrderProductDto = {
			productId: '1c1e1c11-1bae-1149-8473-2e36571311be' as unknown as Product,
		};

		await expect(orderProductService.update(id, updateOrderProductDto)).rejects.toThrow(
			httpCrudOrderProductMessages.errorAlActualizar
		);
	});

	test('delete_conIdExistente_eliminaCategoria', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';

		const resultDelete: DeleteResult | undefined = await orderProductService.delete(id);

		expect(resultDelete).not.toBeUndefined();
		expect(resultDelete?.affected).toBe(1);
	});

	test('delete_conIdInexistente_lanzaExecpcion', async () => {
		const id: string = '7c3e1c77-7bae-4049-8473-2e36578377be';

		await expect(orderProductService.delete(id)).rejects.toThrow(httpCrudOrderProductMessages.errorAlEliminar);
	});
});
