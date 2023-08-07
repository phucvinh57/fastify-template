import { PrismaClient } from '@prisma/client';
import { logger } from '@utils';

export const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        }
    ]
});

prisma.$on('query', (e) => logger.info(e));
