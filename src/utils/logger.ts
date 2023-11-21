import { FastifyError } from 'fastify';
import { PinoLoggerOptions } from 'fastify/types/logger';
import { envs } from '@configs';
import pino from 'pino';

const errorSerialize = (err: FastifyError) => {
    const isInternalServerError = !err.statusCode || err.statusCode === 500;
    return {
        type: err.name,
        stack: isInternalServerError && err.stack ? err.stack : 'null',
        message: err.message,
        statusCode: err.statusCode
    };
};

const fileLogTargets = ['info', 'warn', 'error', 'fatal'].map((logLevel) => ({
    target: 'pino/file',
    level: logLevel,
    options: {
        destination: process.cwd() + `/logs/${logLevel}.log`,
        mkdir: true
    }
}));
const pinoLogTarget = {
    target: 'pino-pretty',
    level: 'info',
    options: {
        translateTime: 'dd/mm/yy HH:MM:ss',
        ignore: 'pid,hostname'
    }
};
const discordLogTarget = {
    target: '../configs/logger/discord',
    level: 'warn',
    options: {
        webhookUrl: envs.DISCORD_WEBHOOK_URL,
        ignore: 'time, pid, hostname'
    } as DiscordLogOptions
};

const loggerConfig: Record<NodeEnv, PinoLoggerOptions> = {
    development: {
        transport: { targets: [pinoLogTarget, discordLogTarget] },
        serializers: { err: errorSerialize }
    },
    production: {
        transport: { targets: [discordLogTarget, ...fileLogTargets] },
        serializers: { err: errorSerialize }
    },
    test: { serializers: { err: errorSerialize } }
};

export const logger = pino(loggerConfig[envs.NODE_ENV]);
