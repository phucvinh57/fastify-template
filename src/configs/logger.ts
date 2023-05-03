import { FastifyError, FastifyLoggerOptions } from 'fastify';
import { PinoLoggerOptions } from 'fastify/types/logger';

const errorSerialize = (err: FastifyError) => {
    const isInternalServerError = !err.statusCode || (err.statusCode && err.statusCode);
    return {
        type: err.name,
        stack: isInternalServerError && err.stack ? err.stack : 'null',
        message: err.message,
        statusCode: err.statusCode
    };
};

export const loggerConfig: Record<Environment, boolean | (FastifyLoggerOptions & PinoLoggerOptions)> = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'dd/mm/yy HH:MM:ss',
                ignore: 'pid,hostname'
            }
        },
        serializers: { err: errorSerialize }
    },
    staging: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'dd/mm/yy HH:MM:ss',
                ignore: 'pid,hostname'
            }
        },
        serializers: { err: errorSerialize }
    },
    production: { serializers: { err: errorSerialize } },
    test: false
};
