import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getConfig(): DataSourceOptions {
    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [process.cwd() + '/src/**/*.entity{.ts,.js}'],
        migrations: [process.cwd() + 'configuration/database/migrations/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
    }
}

//process.cwd() + '/src/**/*.entity{.ts,.js}'
