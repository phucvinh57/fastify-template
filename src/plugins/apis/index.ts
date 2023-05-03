import { verifyToken } from '@middlewares';
import { FastifyInstance } from 'fastify';
import { userPlugin } from './user.plugin';

export async function apiPlugin(app: FastifyInstance) {
    app.addHook('preHandler', verifyToken);
    app.register(userPlugin, { prefix: '/user' });
}
