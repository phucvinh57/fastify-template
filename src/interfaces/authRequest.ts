import { FastifyRequest, RouteGenericInterface } from 'fastify';

interface DefaultAuthRequestInterface {
    Headers: {
        userId: string;
        [header: string]: unknown;
    };
}

export type AuthRequest<T extends RouteGenericInterface = DefaultAuthRequestInterface> = FastifyRequest<DefaultAuthRequestInterface & T>;
