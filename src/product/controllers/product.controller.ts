import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { StatusCodes } from 'http-status-codes';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { DeleteResult } from 'typeorm';

export class ProductController {
	constructor(private readonly productService = new ProductService()) {}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const products: Product[] = await this.productService.findAll();

		res.status(StatusCodes.OK).json(products);
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const product: Product | undefined = await this.productService.findById(id);

			res.status(StatusCodes.OK).json(product);
		} catch (error: any) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const createProductDto: CreateProductDto = req.body;

			const newProduct: Product | undefined = await this.productService.create(
				createProductDto
			);

			res.status(StatusCodes.CREATED).json(newProduct);
		} catch (error: any) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const updateProductDto: UpdateProductDto = req.body;

			const productUpdated: Product | undefined = await this.productService.update(
				id,
				updateProductDto
			);

            res.status(StatusCodes.OK).json(productUpdated);
		} catch (error: any) {
			next(error);
		}
	}

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;

            const resultDelete: DeleteResult | undefined = await this.productService.delete(id);

            res.status(StatusCodes.OK).json(resultDelete);
        } catch(error: any){
            next(error)
        }
    }
}
