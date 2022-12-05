import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';
import { StatusCodes } from 'http-status-codes';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { DeleteResult } from 'typeorm';
export class CategoryController {
	constructor(private readonly categoryService = new CategoryService()) {}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const categories: Category[] = await this.categoryService.findAll();

		res.status(StatusCodes.OK).json(categories);
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const category: Category | undefined = await this.categoryService.findById(id);

			res.status(StatusCodes.OK).json(category);
		} catch (error: any) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const createCategoryDto: CreateCategoryDto = req.body;

			const newCategory: Category | undefined = await this.categoryService.create(
				createCategoryDto
			);

			res.status(StatusCodes.CREATED).json(newCategory);
		} catch (error: any) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const updateCategoryDto: UpdateCategoryDto = req.body;

			const categoryUpdated: Category | undefined = await this.categoryService.update(
				id,
				updateCategoryDto
			);

            res.status(StatusCodes.OK).json(categoryUpdated);
		} catch (error: any) {
			next(error);
		}
	}

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;

            const resultDelete: DeleteResult = await this.categoryService.delete(id);

            res.status(StatusCodes.OK).json(resultDelete);
        } catch(error: any){
            next(error)
        }
    }
}
