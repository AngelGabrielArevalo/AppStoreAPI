import { BaseEntity } from '../../src/common/entities/base.entity';
import { Repository, DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import fs from 'fs';

export async function destroyDB( dataSource: DataSource): Promise<void> {
	await dataSource.createQueryRunner().clearDatabase();
	await dataSource.destroy();
}

export async function insert(dataSource: DataSource): Promise<void> {
	const query = await fs.promises.readFile(process.cwd() + `/tests/configuration/sql/insertRegisters.sql`, 'utf-8');
	await dataSource.query(query);
}
