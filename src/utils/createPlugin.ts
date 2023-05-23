import { HandlerTag } from '@constants';
import { FastifyInstance, RouteOptions } from 'fastify';

export function createPlugin(swaggerTags: HandlerTag[], routesOptions: RouteOptions[]) {
    return async function (app: FastifyInstance) {
        routesOptions.forEach((options) => {
            app.route({
                ...options,
                schema: {
                    ...options.schema,
                    tags: swaggerTags
                },
                /**
                 * True by default. See https://www.fastify.io/docs/latest/Reference/Server/#exposeHeadRoutes
                 * About HEAD http method: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
                 */
                exposeHeadRoute: false
            });
        });
    };
}
