import { ConfigServer } from '../../configuration/configServer';
import { BaseEntity } from '../entities/base.entity';
import { EntityTarget, Repository } from 'typeorm';
import { AppDataSource } from '../../configuration/database/data.source';

export abstract class BaseService<T extends BaseEntity> {
	constructor(private getEntity: EntityTarget<T>) {}

	protected getRepository(): Repository<T> {
		return AppDataSource.getRepository(this.getEntity);
	}
}
