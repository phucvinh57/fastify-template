import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        userId: string;
    }
    interface FastifyInstance {
        start: () => Promise<void>;
        shutdown: () => Promise<void>;
    }
}
