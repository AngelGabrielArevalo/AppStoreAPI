import { ConfigServer } from '../../configuration/configServer';
import { BaseEntity } from '../entities/base.entity';
import { EntityTarget, Repository } from 'typeorm';

export abstract class BaseService<T extends BaseEntity> extends ConfigServer {
	constructor(private getEntity: EntityTarget<T>) {
        super();
        
    };

    protected getRepository(): Repository<T> {
        return this.AppDataSource.getRepository(this.getEntity);
    }
}
