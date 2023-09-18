import { envs } from '@configs/env';
import { createServer } from './Server';

const PORT = 8080;

// DO NOT modify, it is used to resolve port mapping when deploy.
const HOST = envs.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0';

// Setup and start fastify server
const app = createServer({
    host: HOST,
    port: PORT
});

app.start();
