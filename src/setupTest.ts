import { FastifyInstance } from 'fastify';
import { createServer } from './Server';
import SuperTest from 'supertest';

let app: FastifyInstance;
let supertest: ReturnType<typeof SuperTest>;

beforeAll(async () => {
    app = createServer({ host: 'localhost' });
    await app.start();
    supertest = SuperTest(app.server);

    jest.useFakeTimers({ doNotFake: ['nextTick', 'Date', 'hrtime'] });
});

afterAll(async () => {
    await app.shutdown();
    jest.clearAllTimers();
});

export { supertest };
