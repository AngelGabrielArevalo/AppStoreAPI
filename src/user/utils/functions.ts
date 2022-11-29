import boom from '@hapi/boom';
import { httpCrudUserMessages } from './responses';

export function handleDBEcpection(error: any): void {
	if (error.code === '23505') {
		throw boom.badRequest(error.detail);
	}
}
