import boom from '@hapi/boom';

export function handleDBEcpection(error: any): void {
	if (error.code === '23505' || error.code === '23503') {
		throw boom.badRequest(error.detail);
	}
	if(error.isBoom){
		throw error;
	}
}
