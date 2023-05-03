import fastify from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import { COOKIE_SECRET, CORS_WHITE_LIST, ENVIRONMENT, loggerConfig, swaggerConfig, swaggerUIConfig } from '@configs';
import { apiPlugin, authPlugin } from './plugins';

export function createServer(config: ServerConfig) {
    const app = fastify({ logger: loggerConfig[ENVIRONMENT] });
    global.logger = app.log;

    app.register(import('@fastify/sensible'));
    app.register(import('@fastify/helmet'));
    app.register(import('@fastify/cors'), {
        origin: CORS_WHITE_LIST
    });

    app.register(import('@fastify/cookie'), {
        secret: COOKIE_SECRET, // for cookies signature
        hook: 'onRequest'
    } as FastifyCookieOptions);

    // Swagger on production will be turned off in the future
    if (ENVIRONMENT === 'development' || ENVIRONMENT === 'staging' || ENVIRONMENT === 'production') {
        app.register(import('@fastify/swagger'), swaggerConfig);
        app.register(import('@fastify/swagger-ui'), swaggerUIConfig);
    }

    app.register(authPlugin, { prefix: '/auth' });
    app.register(apiPlugin, { prefix: '/api' });

    app.ready().then(() => {
        app.swagger({ yaml: true });
        // kafkaAdmin.connect().then(() => app.log.info("Kakfa admin connected"));
        app.log.info(`Swagger documentation is on http://${config.host}:${config.port}/docs`);
    });

    const listen = () => {
        app.listen(
            {
                host: config.host,
                port: config.port
            },
            function (err) {
                if (err) {
                    app.log.error(err);
                }
            }
        );
        process.on('SIGINT', () => {
            app.log.info('Exited program');
            process.exit(0);
        });
    };

    return {
        ...app,
        listen
    };
}
