import { userSchema } from '@dtos/out';
import { usersHandler } from '@handlers';
import { createRoutes } from '@utils';

export const userPlugin = createRoutes('User', [
    {
        method: 'GET',
        url: '',
        schema: {
            response: {
                200: userSchema
            }
        },
        handler: usersHandler.getUserById
    }
]);
