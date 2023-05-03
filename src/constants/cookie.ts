import { ENVIRONMENT } from '@configs';

export const cookieOptions = {
    signed: false,
    secure: ENVIRONMENT === 'production',
    path: '/',
    httpOnly: true
};
