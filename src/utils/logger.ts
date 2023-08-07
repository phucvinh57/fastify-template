import { envs, loggerConfig } from '@configs';
import pino from 'pino';

export const logger = pino(loggerConfig[envs.NODE_ENV]);
