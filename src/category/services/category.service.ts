import { BaseService } from '../../common/services/base.service';
import { Category } from '../entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import boom from '@hapi/boom';
import { httpCrudCategoryMessages } from '../utils/responses';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { errorsDBHandlerException } from '../../common/utils/functions';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export class CategoryService extends BaseService<Category> {
	private categoryRepository: Repository<Category>;
	constructor() {
		super(Category);
		this.categoryRepository = this.getRepository();
	}

	async findAll(): Promise<Category[]> {
		const categories: Category[] = await this.categoryRepository.find();

		return categories;
	}

	async findById(id: string): Promise<Category | undefined> {
		const category: Category | null = await this.categoryRepository.findOneBy({ id });
		if (!category) {
			throw boom.notFound(httpCrudCategoryMessages.notFoundId);
		}

		return category;
	}

	async create(createCategoryDto: CreateCategoryDto): Promise<Category | undefined> {
		try {
			const newCategory: Category = this.categoryRepository.create(createCategoryDto);

			return await this.categoryRepository.save(newCategory);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | undefined> {
		try {
			const resultUpdate: UpdateResult = await this.categoryRepository.update(
				id,
				updateCategoryDto
			);
			if (!resultUpdate.affected) {
				throw boom.badRequest(httpCrudCategoryMessages.errorAlActualizar);
			}

			return await this.findById(id);
		} catch (error: any) {
			throw errorsDBHandlerException(error);
		}
	}

	async delete(id: string): Promise<DeleteResult> {
		const resultDelete: DeleteResult = await this.categoryRepository.delete(id);
		if(!resultDelete.affected) {
			throw boom.badRequest(httpCrudCategoryMessages.errorAlEliminar);
		}
		return resultDelete;
	}
}
