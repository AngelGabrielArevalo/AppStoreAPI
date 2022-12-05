import { CategoryService } from '../../../src/category/services/category.service';
import { ConfigServer } from '../../../src/configuration/configServer';
import { getQuery } from '../../configuration/getQuery';
import { Category } from '../../../src/category/entities/category.entity';
import { httpCrudCategoryMessages } from '../../../src/category/utils/responses';
import { CreateCategoryDto } from '../../../src/category/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../../src/category/dtos/update-category.dto';
import { DeleteResult } from 'typeorm';
import { Console } from 'console';

describe('Tests Category Service', () => {
	jest.setTimeout(60000);
	const categoryService: CategoryService = new CategoryService();
	const configServer: ConfigServer = new ConfigServer();

	beforeEach(async () => {
		await configServer.initDataBaseConecction();
		await configServer.synchronizeDB();
		await configServer.executeQuery(await getQuery());
	});
	afterEach(async () => {
		await configServer.clearDBAndDisconect();
	});

	test('findAll_conCategoriesExistentes_retornaArrayDeCategories', async () => {
		const categories: Category[] = await categoryService.findAll();

		expect(categories).not.toBeNull();
		expect(categories.length).toBe(4);
	});

	test('findById_conIdExistente_retornaCategory', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';

		const category: Category | undefined = await categoryService.findById(id);

		expect(category).not.toBeUndefined();
		expect(category?.name).toBe('vehiculos');
	});

	test('findById_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '5c9e1c21-9bae-4049-8473-2e36578377be';

		await categoryService.findById(id).catch(error => {
			expect(error.isBoom).toBeTruthy();
			expect(error.output.payload.message).toBe(httpCrudCategoryMessages.notFoundId);
		});
	});

	test('create_conParametrosValidos_guardaCategory', async () => {
		const createCategoryDto: CreateCategoryDto = {
			name: 'Lacteos',
			image: 'http://localhost',
		};

		const newCategory: Category | undefined = await categoryService.create(createCategoryDto);

		expect(newCategory).not.toBeNull();
		expect(newCategory?.name).toBe(createCategoryDto.name);
	});

	test('create_conNameExistente_lanzaExcepcion', async () => {
		const createCategoryDto: CreateCategoryDto = {
			name: 'vehiculos',
			image: 'http://localhost',
		};

		await categoryService.create(createCategoryDto).catch(error => {
			expect(error.isBoom).toBeTruthy();
			expect(error.output.payload.message).toBe('Key (name)=(vehiculos) already exists.');
		});
	});

	test('update_conParametrosValidos_actualizaCategory', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateCategoryDto: UpdateCategoryDto = {
			image: 'test',
		};

		const categoryUpdated: Category | undefined = await categoryService.update(
			id,
			updateCategoryDto
		);

		expect(categoryUpdated?.image).toBe(updateCategoryDto.image);
	});

	test('update_conNameExistente_lanzaExcepcion', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateCategoryDto: UpdateCategoryDto = {
			name: 'supermercado',
		};

		await categoryService.update(id, updateCategoryDto).catch(error => {
			expect(error.isBoom).toBeTruthy();
			expect(error.output.payload.message).toBe('Key (name)=(supermercado) already exists.');
		});
	});

	test('update_conIdInexistente_lanzaExcepcion', async () => {
		const id: string = '7c7e1c77-9bae-4049-8473-2e36578377be';
		const updateCategoryDto: UpdateCategoryDto = {
			name: 'test',
		};

		await categoryService.update(id, updateCategoryDto).catch(error => {
			expect(error.isBoom).toBeTruthy();
			expect(error.output.payload.message).toBe(httpCrudCategoryMessages.errorAlActualizar);
		});
	});

	test('delete_conIdExistente_eliminaCategoria', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';

		const resultDelete: DeleteResult = await categoryService.delete(id);
		
		expect(resultDelete.affected).toBe(1);
	});

	test('delete_conIdInexistente_lanzaExecpcion', async () => {
		const id: string = '7c3e1c77-7bae-4049-8473-2e36578377be';

		await expect(categoryService.delete(id)).rejects.toThrow(httpCrudCategoryMessages.errorAlEliminar);
	});
});
