import { Router } from "express";

export abstract class BaseRouter<T, U> {
    public router: Router;
    public controller: T;
    public middleware: U;

    constructor(TController: {new (): T}, UMidlleware: {new (): U}) {
        this.router = Router();
        this.controller = new TController();
        this.middleware = new UMidlleware();
        this.routes();
    }

    routes() {}
}