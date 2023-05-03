import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        }
    ]
});

prisma.$on('query', (e) => {
    global.logger.info(e);
});
