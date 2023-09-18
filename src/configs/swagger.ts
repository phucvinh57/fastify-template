import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import pkg from '#package.json';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    openapi: {
        info: {
            title: pkg.name,
            version: pkg.version,
            license: { name: 'ISC' },
            summary: pkg.description
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        }
    }
};

export const swaggerUIConfig: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: {
        deepLinking: false
    },
    staticCSP: false
};
