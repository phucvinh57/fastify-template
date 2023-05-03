import { FastifyBaseLogger } from 'fastify';

declare global {
    // eslint-disable-next-line no-var
    var logger: FastifyBaseLogger;
}
export {};
