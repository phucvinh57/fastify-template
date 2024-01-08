import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    openapi: {
        info: {
            title: '<Your project name>',
            version: '1.0.0',
            license: { name: 'ISC' },
            summary: '<Your project summary>'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        }
    }
};

export const swaggerUIConfig: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: { deepLinking: false },
    staticCSP: false
};
