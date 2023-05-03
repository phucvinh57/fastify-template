import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    swagger: {
        info: {
            title: 'API docs',
            description: '',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'token',
                in: 'header'
            }
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
