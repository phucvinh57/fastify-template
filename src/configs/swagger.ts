import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    openapi: {
        info: {
            title: 'API docs',
            summary: 'Swagger documentation',
            version: '0.1.0',
            license: { name: 'ISC' }
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
    staticCSP: true,
    transformStaticCSP: (header) => header,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transformSpecification: (swaggerObject, _request, _reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true
};
