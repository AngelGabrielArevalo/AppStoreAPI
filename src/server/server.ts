import "reflect-metadata";
import express, { Application, Router } from "express";
import { ConfigServer } from '../configuration/configServer';
import { UserRouter } from '../user/user.router';
import morgan from "morgan";
import cors from 'cors';
import { HandleErrorMiddleware } from '../common/middlewares/handleErrors.middleware';

export class ServerBoostrap extends ConfigServer{
    public app: Application;
    private port: number;

    constructor() {
        super();
        this.app = express();
        this.port = this.getNumberEnvironments('PORT') || 3000;
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morgan("dev"));
        this.app.use(cors());

        this.app.use("/api/v1", this.routers());

        this.app.use(HandleErrorMiddleware.handleErrors);
    }

    routers(): Array<Router> {
        return [
            new UserRouter().router
        ];
    }

    async dbConnect(): Promise<void> {
        try {
            await this.initDataBaseConecction();
            console.log("Conectado a la base de datos");
        } catch (error) {
            console.log(error);
            console.error("Error al conectarse a la base de datos");
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port " + this.port);
        });
    }
}