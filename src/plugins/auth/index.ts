import { HandlerTag } from '@constants';
import { authHandler } from '@handlers';
import { authInputSchema } from '@dtos/in';
import { authResultSchema } from '@dtos/out';
import { createPlugin } from '@utils';

export const authPlugin = createPlugin(
    [HandlerTag.AUTH],
    [
        {
            method: 'POST',
            url: '/login',
            schema: {
                body: authInputSchema,
                response: {
                    200: authResultSchema
                }
            },
            handler: authHandler.login
        },
        {
            method: 'POST',
            url: '/signup',
            schema: {
                body: authInputSchema,
                response: {
                    200: authResultSchema
                }
            },
            handler: authHandler.signup
        }
    ]
);
