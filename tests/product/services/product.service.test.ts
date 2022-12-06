import { ConfigServer } from '../../../src/configuration/configServer';
import { ProductService } from '../../../src/product/services/product.service';
import { getQuery } from '../../configuration/getQuery';
import { Product } from '../../../src/product/entities/product.entity';
import { httpCrudProductMessages } from '../../../src/product/utils/responses';
import { CreateProductDto } from '../../../src/product/dtos/create-product.dto';
import { Category } from '../../../src/category/entities/category.entity';
import { UpdateProductDto } from '../../../src/product/dtos/update-product.dto';
import { DeleteResult } from 'typeorm';

describe('Test ProductService', () => {
	jest.setTimeout(60000);
	const productService = new ProductService();
	const configServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});
	afterEach(async () => {
		await configServer.clearDBAndDisconect();
	});

	test('findAll_conProductsExistentes_retornaArrayDeProducts', async () => {
		const products: Product[] = await productService.findAll();

		expect(products).not.toBeNull();
		expect(products.length).toBe(4);
	});

	test('findBy_conIdExistente_retornaProduct', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const product: Product | undefined = await productService.findById(id);

		expect(product).not.toBeNull();
		expect(product?.name).toBe('Onda Civic');
	});

	test('findById_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '1c3e1c33-9bae-4049-8473-2e36578377be';

		await expect(productService.findById(id)).rejects.toThrow(
			httpCrudProductMessages.noExistForId
		);
	});

	test('create_conParametrosValidos_guardaProduct', async () => {
		const createProductDto: CreateProductDto = {
			name: 'Azucar',
			description: 'Azucar 0000',
			price: 500,
			image: 'http://localhost',
			categoryId: '5c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
		};

		const newProduct: Product | undefined = await productService.create(createProductDto);

		expect(newProduct).not.toBeUndefined();
		expect(newProduct?.name).toBe(createProductDto.name);
	});

	test('create_conCategoryIdInexistente_lanzaExcepcion', async () => {
		const createProductDto: CreateProductDto = {
			name: 'Azucar',
			description: 'Azucar 0000',
			price: 500,
			image: 'http://localhost',
			categoryId: '9c9e9c99-9bae-4049-8473-2e36578377be' as unknown as Category,
		};

		await expect(productService.create(createProductDto)).rejects.toThrow(
			'Key (category_id)=(9c9e9c99-9bae-4049-8473-2e36578377be) is not present in table "categories".'
		);
	});

	test('update_conIdExistenteYParametrosValidos_actualizaProduct', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const fechaDeHoy: Date = new Date();
		const updateProductDto: UpdateProductDto = {
			price: 1500,
		};

		const productUpdated: Product | undefined = await productService.update(
			id,
			updateProductDto
		);

		expect(productUpdated).not.toBeNull();
		expect(productUpdated?.price).toBe(updateProductDto.price);
		expect(productUpdated?.updatedAt.setHours(0, 0, 0, 0)).toBe(
			fechaDeHoy.setHours(0, 0, 0, 0)
		);
	});

	test('update_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '9c9e1c91-9bae-4049-8473-2e36578377be';
		const updateProductDto: UpdateProductDto = {
			price: 1500,
		};

		await expect(productService.update(id, updateProductDto)).rejects.toThrow(
			httpCrudProductMessages.errorAlActualizar
		);
	});

	test('update_conCategoryIdInexistente_lanzaExcepcion', async () => {
		const id: string = '5c4e1c21-9bae-4049-8473-2e36578377be';
		const updateProductDto: UpdateProductDto = {
			categoryId: '9c9e9c99-9bae-4049-8473-2e36578377be' as unknown as Category,
		};

		await expect(productService.update(id, updateProductDto)).rejects.toThrow(
			'Key (category_id)=(9c9e9c99-9bae-4049-8473-2e36578377be) is not present in table "categories".'
		);
	});

	test('delete_conIdExistente_eliminaProduct', async () => {
		const id = '5c4e1c21-9bae-4049-8473-2e36578377be';

		const result: DeleteResult | undefined = await productService.delete(id);

		expect(result).not.toBeNull();
		expect(result?.affected).toBe(1);
	});

	test('delete_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '8c3e1c21-9bae-4049-8473-2e36578377be';

		await expect(productService.delete(id)).rejects.toThrow(
			httpCrudProductMessages.errorAlEliminar
		);
	});
});
