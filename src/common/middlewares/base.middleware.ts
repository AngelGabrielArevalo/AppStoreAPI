import { SchemaDto, LocationRequest } from '../types/types';
import { NextFunction, Request, Response } from 'express';
import { getClassSchema } from 'joi-class-decorators';
import { Constructor } from 'joi-class-decorators/internal/defs';
import { validate } from 'uuid';
import boom from '@hapi/boom';
import { httpResponseMessages } from '../utils/responses';

export class BaseMiddleware {
	constructor() {}

	validarDto(nameSchema: SchemaDto, dto: Constructor, location: LocationRequest) {
		return (req: Request, res: Response, next: NextFunction) => {
			const dtoRequest = req[location];
			const schemaCreate = getClassSchema(dto, { group: nameSchema });
			const { error } = schemaCreate.validate(dtoRequest, { abortEarly: false });

			if (!error) {
				return next();
			}

			next(boom.badRequest(JSON.stringify(error.details)));
		};
	}

	validateUUID(req: Request, res: Response, next: NextFunction): void {
		const { id } = req.params;

        if(validate(id)){
            return next();
        }

        next(boom.badRequest(httpResponseMessages.invalidId));
	}
}
