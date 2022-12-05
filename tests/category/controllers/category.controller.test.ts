import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from 'express';
import { CategoryController } from '../../../src/category/controllers/category.controller';
import { Category } from '../../../src/category/entities/category.entity';
import { CategoryService } from '../../../src/category/services/category.service';
import { StatusCodes } from 'http-status-codes';
import { CreateCategoryDto } from '../../../src/category/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../../src/category/dtos/update-category.dto';
import { DeleteResult } from 'typeorm';

describe('Tests CategoryController', () => {
	const categoryController: CategoryController = new CategoryController();

	test('findAll_conCategoriesExistentes_respondeJSONConCategoriesYStatus200', async () => {
		const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockCategories: Category[] = [
			{
				id: '5c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'vehiculos',
				image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
			},
			{
				id: '6c3e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'supermercado',
				image: 'https://thumbs.dreamstime.com/b/items-del-supermercado-28832872.jpg',
			},
		];
		const mockService = jest
			.spyOn(CategoryService.prototype, 'findAll')
			.mockResolvedValue(mockCategories);

		await categoryController.findAll(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockCategories);
	});

	test('findById_conIdExistente_respondeJSONConCategoryYStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockCategory: Category = {
			id: '5c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			name: 'vehiculos',
			image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
		};
		const mockService = jest
			.spyOn(CategoryService.prototype, 'findById')
			.mockResolvedValue(mockCategory);

		await categoryController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockCategory);
	});

	test('findById_conIdInexistente_llamaANext', async () => {
		const id: string = '7c7e7c77-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CategoryService.prototype, 'findById')
			.mockImplementation(() => {
				throw new Error();
			});

		await categoryController.findById(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('create_conParametrosValidos_respondeJSONConCategoryYStatus201', async () => {
		const createCategoryDto: CreateCategoryDto = {
			name: 'Lacteos',
			image: 'http://localhost',
		};
		const req: Request = getMockReq({ body: createCategoryDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockNewCategory: Category = {
			id: '5c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			name: 'Lacteos',
			image: 'http://localhost',
		};
		const mockService = jest
			.spyOn(CategoryService.prototype, 'create')
			.mockResolvedValue(mockNewCategory);

		await categoryController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(createCategoryDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockNewCategory);
	});

	test('create_conParametrosInvalidos_llamaANext', async () => {
		const createCategoryDto: CreateCategoryDto = {
			name: 'vehiculos',
			image: 'http://localhost',
		};
		const req: Request = getMockReq({ body: createCategoryDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CategoryService.prototype, 'create')
			.mockImplementation(() => {
				throw new Error();
			});

		await categoryController.create(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('update_conParametrosValidos_respondeJSONConCategoryYStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const createCategoryDto: UpdateCategoryDto = {
			image: 'http://localhost',
		};
		const req: Request = getMockReq({ params: { id: id }, body: createCategoryDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockCategoryUpdated: Category = {
			id: '5c3e1c21-9bae-4049-8473-2e36578377be',
			createdAt: new Date('2022-11-23T00:48:14.555Z'),
			updatedAt: new Date('2022-11-23T00:48:14.555Z'),
			name: 'vehiculos',
			image: 'http://localhost',
		};
		const mockService = jest
			.spyOn(CategoryService.prototype, 'update')
			.mockResolvedValue(mockCategoryUpdated);

		await categoryController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id, createCategoryDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockCategoryUpdated);
	});

	test('update_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateCategoryDto: UpdateCategoryDto = {
			name: 'NOMBRE EXISTENTE',
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateCategoryDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CategoryService.prototype, 'create')
			.mockImplementation(() => {
				throw new Error();
			});

		await categoryController.create(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

    test('delete_conParametrosValidos_respondeJSONConDeleteResultYAffectEn1YStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id }});
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
		const mockService = jest
			.spyOn(CategoryService.prototype, 'delete')
			.mockResolvedValue(mockDeleteResult);

		await categoryController.delete(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockDeleteResult);
	});

	test('delete_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '7c3e1c21-7bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(CategoryService.prototype, 'delete')
			.mockImplementation(() => {
				throw new Error();
			});

		await categoryController.delete(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});
});
