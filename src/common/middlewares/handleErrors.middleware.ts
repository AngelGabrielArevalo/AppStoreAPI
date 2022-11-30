import { NextFunction, Request, Response } from "express";
import boom from '@hapi/boom';
import { httpResponseMessages } from '../utils/responses';
import { StatusCodes } from 'http-status-codes';

export class HandleErrorMiddleware {
    static handleErrors(error: any, req: Request, res: Response, next: NextFunction): void{
        if(error.isBoom) {
            res.status(error.output.statusCode).json(error.output.payload);
        }else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(boom.internal().output.payload);
        }
    }
}