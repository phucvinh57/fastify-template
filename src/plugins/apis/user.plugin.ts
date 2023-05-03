import { HandlerTag } from '@constants';
import { userSchema } from '@dtos/out';
import { usersHandler } from '@handlers';
import { createPlugin } from '@utils';

export const userPlugin = createPlugin(
    [HandlerTag.USER],
    [
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
    ]
);
