import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { AppDataSource } from '../configuration/database/data.source';

export const seedRouter = Router();

seedRouter.get('/seed', seedController);

async function seedController(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const query: string = await fs.promises.readFile(
			__dirname + '/insertRegisters.sql',
			'utf-8'
		);

		await AppDataSource.query(query);

		res.json({
			message: 'Base cargada',
		});
	} catch (error) {
		console.log(error);
	}
}
