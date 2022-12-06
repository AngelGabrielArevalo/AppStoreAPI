import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from 'express';
import { ProductController } from '../../../src/product/controllers/product.controller';
import { Product } from '../../../src/product/entities/product.entity';
import { ProductService } from '../../../src/product/services/product.service';
import { StatusCodes } from 'http-status-codes';
import { CreateProductDto } from '../../../src/product/dtos/create-product.dto';
import { UpdateProductDto } from '../../../src/product/dtos/update-product.dto';
import { DeleteResult } from 'typeorm';
import { Category } from '../../../src/category/entities/category.entity';

describe('Tests ProductController', () => {
	const productController: ProductController = new ProductController();

	test('findAll_conProductsExistentes_respondeJSONConProductsYStatus200', async () => {
		const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockProducts: Product[] = [
			{
				id: '5c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'Onda Civic',
				description: 'Auto 0KM',
				price: 10000,
				image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				categoryId: '5c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
			},
			{
				id: '6c4e1c21-9bae-4049-8473-2e36578377be',
				createdAt: new Date('2022-11-23T00:48:14.555Z'),
				updatedAt: new Date('2022-11-23T00:48:14.555Z'),
				name: 'Pan',
				description: 'Pan Flauta',
				price: 500,
				image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
				categoryId: '6c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
			},
		];
		const mockService = jest
			.spyOn(ProductService.prototype, 'findAll')
			.mockResolvedValue(mockProducts);

		await productController.findAll(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockProducts);
	});

	test('findById_conIdExistente_respondeJSONConProductYStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockProduct: Product = {
            id: '5c4e1c21-9bae-4049-8473-2e36578377be',
            createdAt: new Date('2022-11-23T00:48:14.555Z'),
            updatedAt: new Date('2022-11-23T00:48:14.555Z'),
            name: 'Onda Civic',
            description: 'Auto 0KM',
            price: 10000,
            image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
            categoryId: '5c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
        };
		const mockService = jest
			.spyOn(ProductService.prototype, 'findById')
			.mockResolvedValue(mockProduct);

		await productController.findById(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockProduct);
	});

	test('findById_conIdInexistente_llamaANext', async () => {
		const id: string = '7c7e7c77-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id } });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(ProductService.prototype, 'findById')
			.mockImplementation(() => {
				throw new Error();
			});

		await productController.findById(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('create_conParametrosValidos_respondeJSONConProductYStatus201', async () => {
		const createProductDto: CreateProductDto = {
			name: 'Azucar',
			description: 'Azucar 0000',
			price: 500,
			image: 'http://localhost',
			categoryId: '5c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
		};
		const req: Request = getMockReq({ body: createProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockNewProduct: Product = {
            id: '5c4e1c21-9bae-4049-8473-2e36578377be',
            createdAt: new Date('2022-11-23T00:48:14.555Z'),
            updatedAt: new Date('2022-11-23T00:48:14.555Z'),
            name: 'Azucar',
            description: 'Azucar 0000',
            price: 500,
            image: 'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
            categoryId: '5c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
        };
		const mockService = jest
			.spyOn(ProductService.prototype, 'create')
			.mockResolvedValue(mockNewProduct);

		await productController.create(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(createProductDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockNewProduct);
	});

	test('create_conParametrosInvalidos_llamaANext', async () => {
		const createProductDto: CreateProductDto = {
			name: 'Azucar',
			description: 'Azucar 0000',
			price: 500,
			image: 'http://localhost',
			categoryId: 'ID INEXISTENTE' as unknown as Category,
		};
		const req: Request = getMockReq({ body: createProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(ProductService.prototype, 'create')
			.mockImplementation(() => {
				throw new Error();
			});

		await productController.create(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('update_conParametrosValidos_respondeJSONConProductYStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateProductDto: UpdateProductDto = {
			image: 'http://localhost',
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockProductUpdated: Product = {
            id: '5c4e1c21-9bae-4049-8473-2e36578377be',
            createdAt: new Date('2022-11-23T00:48:14.555Z'),
            updatedAt: new Date('2022-11-23T00:48:14.555Z'),
            name: 'Azucar',
            description: 'Azucar 0000',
            price: 500,
            image: 'http://localhost',
            categoryId: '5c3e1c21-9bae-4049-8473-2e36578377be' as unknown as Category,
        };
		const mockService = jest
			.spyOn(ProductService.prototype, 'update')
			.mockResolvedValue(mockProductUpdated);

		await productController.update(req, res, next);

		expect(mockService).toHaveBeenCalledTimes(1);
		expect(mockService).toBeCalledWith(id, updateProductDto);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(mockProductUpdated);
	});

	test('update_conParametrosInvalidos_llamaANext', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const updateProductDto: UpdateProductDto = {
			categoryId: 'ID INEXISTENTE' as unknown as Category,
		};
		const req: Request = getMockReq({ params: { id: id }, body: updateProductDto });
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockService = jest
			.spyOn(ProductService.prototype, 'update')
			.mockImplementation(() => {
				throw new Error();
			});

		await productController.update(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});

	test('delete_conParametrosValidos_respondeJSONConDeleteResultYAffectEn1YStatus200', async () => {
		const id: string = '5c3e1c21-9bae-4049-8473-2e36578377be';
		const req: Request = getMockReq({ params: { id: id }});
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;
		const mockDeleteResult: DeleteResult = { raw: [], affected: 1 };
		const mockService = jest
			.spyOn(ProductService.prototype, 'delete')
			.mockResolvedValue(mockDeleteResult);

		await productController.delete(req, res, next);

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
			.spyOn(ProductService.prototype, 'delete')
			.mockImplementation(() => {
				throw new Error();
			});

		await productController.delete(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
	});
});
