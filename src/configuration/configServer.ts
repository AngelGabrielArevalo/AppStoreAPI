import dotenv from 'dotenv';
import { AppDataSource } from './database/data.source';

export class ConfigServer {
    private nodeEnv: string | undefined;

    constructor() {
        this.nodeEnv = this.getEnvironment('NODE_ENV');
        dotenv.config({
            path: this.createdPathEnvironment(this.nodeEnv)
        });
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

    public async initDataBaseConecction(): Promise<void>{
         await AppDataSource.initialize();
    }

    async dropDBAndDisconect(): Promise<void> {
        await AppDataSource.createQueryRunner().clearDatabase();
        await AppDataSource.destroy();
    }

    async executeQuery(query: string): Promise<void> {
        await AppDataSource.query(query);
    }

    async synchronizeDB() : Promise<void> {
        await AppDataSource.synchronize();
    }
}