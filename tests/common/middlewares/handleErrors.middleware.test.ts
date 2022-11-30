import boom, { Boom } from '@hapi/boom';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from 'express';
import { HandleErrorMiddleware } from '../../../src/common/middlewares/handleErrors.middleware';
import { StatusCodes } from 'http-status-codes';

describe('Test HandleErrorMiddleware', () => {
    test('handleError_conErrorDeTipoBoom_respondeJSONYStatusDeBoom', () => {
        const error: Boom = boom.badRequest('Bad Request');
        const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;

        HandleErrorMiddleware.handleErrors(error, req, res, next);

        expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(error.output.statusCode);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(error.output.payload);
    });

    test('handleError_conErrorNoDeTipoBoom_respondeJSONYStatus500', () => {
        const error: Error = new Error();
        const req: Request = getMockReq();
		const res: Response = getMockRes().res;
		const next: NextFunction = getMockRes().next;

        HandleErrorMiddleware.handleErrors(error, req, res, next);

        expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toBeCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(res.json).toBeCalledWith(boom.internal().output.payload);
    });
});