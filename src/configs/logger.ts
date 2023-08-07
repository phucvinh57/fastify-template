import { FastifyError } from 'fastify';
import { PinoLoggerOptions } from 'fastify/types/logger';

const errorSerialize = (err: FastifyError) => {
    const isInternalServerError = !err.statusCode || err.statusCode >= 500;
    return {
        type: err.name,
        stack: isInternalServerError && err.stack ? err.stack : 'null',
        message: err.message,
        statusCode: err.statusCode
    };
};

export const loggerConfig: Record<NodeEnv, PinoLoggerOptions> = {
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
    test: {
        serializers: { err: errorSerialize }
    },
    // In production, save log to files.
    // Can write a plugin to use centralize logging services, if need
    production: {
        transport: {
            targets: ['info', 'warn', 'error', 'fatal'].map((logLevel) => ({
                target: 'pino/file',
                level: logLevel,
                options: {
                    destination: process.cwd() + `/logs/${logLevel}.log`,
                    mkdir: true
                }
            }))
        },
        serializers: { err: errorSerialize }
    }
};
