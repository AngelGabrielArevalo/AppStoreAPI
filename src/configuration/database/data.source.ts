require('dotenv').config({
    path: process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV}.env` : '.env',
});
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const Config: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
	migrations: [__dirname + '/migrations/*{.ts,.js}'],
	synchronize: false,
	migrationsRun: true,
	logging: false,
	namingStrategy: new SnakeNamingStrategy(),
	poolSize: 50,
};
export const AppDataSource: DataSource = new DataSource(Config);
