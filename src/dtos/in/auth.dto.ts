import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '@constants';
import { Static, Type } from '@sinclair/typebox';

// See https://github.com/sinclairzx81/typebox

export const AuthInputDto = Type.Object({
    email: Type.String({ minLength: MIN_EMAIL_LENGTH }),
    password: Type.String({ minLength: MIN_PASSWORD_LENGTH })
});

export type AuthInputDto = Static<typeof AuthInputDto>;
