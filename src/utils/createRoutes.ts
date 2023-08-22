import { FastifyInstance, RouteOptions } from 'fastify';

export function createRoutes(swaggerTag: HandlerTag, routesOptions: RouteOptions[]) {
    return async function (app: FastifyInstance) {
        routesOptions.forEach((options) => {
            app.route({
                ...options,
                schema: {
                    ...options.schema,
                    tags: [swaggerTag]
                },
                /**
                 * True by default. See https://www.fastify.dev/docs/latest/Reference/Server/#exposeHeadRoutes
                 * About HEAD http method: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
                 */
                exposeHeadRoute: false
            });
        });
    };
}
