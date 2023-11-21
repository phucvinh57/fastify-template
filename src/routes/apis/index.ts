import { verifyToken } from 'src/hooks';
import { FastifyInstance } from 'fastify';
import { userPlugin } from './user.route';

export async function apiPlugin(app: FastifyInstance) {
    // Why use decorator: https://fastify.dev/docs/latest/Reference/Decorators/#decorators
    app.decorateRequest('user', null);
    app.addHook('preHandler', verifyToken);

    app.register(userPlugin, { prefix: '/user' });
}
