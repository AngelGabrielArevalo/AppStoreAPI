import { Product } from '../entities/product.entity';
import { BaseService } from '../../common/services/base.service';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import boom from '@hapi/boom';
import { httpCrudProductMessages } from '../utils/responses';
import { CreateProductDto } from '../dtos/create-product.dto';
import { errorsDBHandlerException } from '../../common/utils/functions';
import { UpdateProductDto } from '../dtos/update-product.dto';

export class ProductService extends BaseService<Product> {
	private productRepository: Repository<Product>;
	constructor() {
		super(Product);
		this.productRepository = this.getRepository();
	}

	async findAll(): Promise<Product[]> {
		const products: Product[] = await this.productRepository.find({ loadRelationIds: true });
		return products;
	}

	async findById(id: string): Promise<Product | undefined> {
		const product: Product | null = await this.productRepository.findOneBy({ id });
		if (!product) {
			throw boom.notFound(httpCrudProductMessages.noExistForId);
		}

		return product;
	}

	async create(createProductDto: CreateProductDto): Promise<Product | undefined> {
		try {
			const newProduct: Product = this.productRepository.create(createProductDto);

			return await this.productRepository.save(newProduct);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | undefined> {
		try {
			updateProductDto.updatedAt = new Date();
			const result: UpdateResult = await this.productRepository.update(id, updateProductDto);
			if (result.affected === 0) {
				throw boom.badRequest(httpCrudProductMessages.errorAlActualizar);
			}

			return this.findById(id);
		} catch (error: any) {
			errorsDBHandlerException(error);
		}
	}

	async delete(id: string): Promise<DeleteResult | undefined> {
		const result: DeleteResult = await this.productRepository.delete(id);

		if (result.affected === 0) {
			throw boom.badRequest(httpCrudProductMessages.errorAlEliminar);
		}

		return result;
	}
}
