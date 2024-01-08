import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '@constants';
import { Static, Type } from '@sinclair/typebox';

export const AuthInputDto = Type.Object({
    email: Type.String({ minLength: MIN_EMAIL_LENGTH }),
    password: Type.String({ minLength: MIN_PASSWORD_LENGTH })
});

export type AuthInputDto = Static<typeof AuthInputDto>;
