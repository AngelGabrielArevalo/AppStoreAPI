import dotenv from 'dotenv';
import { getConfig } from './database/data.source';
import { DataSource, DataSourceOptions } from 'typeorm';

export class ConfigServer {
    private nodeEnv: string | undefined;
    AppDataSource: DataSource;
    config: DataSourceOptions;

    constructor() {
        this.nodeEnv = this.getEnvironment('NODE_ENV');
        dotenv.config({
            path: this.createdPathEnvironment(this.nodeEnv)
        });
        this.config = getConfig();
        this.AppDataSource = new DataSource(this.config);
    }

    protected getEnvironment(keyEnv: string): string | undefined {
        return process.env[keyEnv];
    }

    protected getNumberEnvironments(keyEnv: string): number | undefined {
        return Number(this.getEnvironment(keyEnv)) || undefined;
    }

    protected createdPathEnvironment(path: string | undefined): string {
        if(path){
            return `.${path}.env`;
        }
        return '.env';
    }

    public async initDataBaseConecction(): Promise<DataSource>{
        return await this.AppDataSource.initialize();
    }
}