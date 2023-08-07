import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';

export type Handler<RS = unknown, RQ extends RouteGenericInterface = Record<string, never>> = (
    req: FastifyRequest<RQ> & { userId: string },
    res: FastifyReply
) => Result<RS>;
