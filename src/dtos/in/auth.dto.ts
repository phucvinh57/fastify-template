import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '@constants';
import s from 'fluent-json-schema';

export const authInputSchema = s
    .object()
    .prop('email', s.string().required().minLength(MIN_EMAIL_LENGTH))
    .prop('password', s.string().required().minLength(MIN_PASSWORD_LENGTH));

export type AuthInputDto = {
    email: string;
    password: string;
};
