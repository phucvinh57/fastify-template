import { ID_LENGTH } from '@constants';
import { Static, Type } from '@sinclair/typebox';

export const ObjectId = Type.String({
    minLength: ID_LENGTH,
    maxLength: ID_LENGTH
});

export type ObjectId = Static<typeof ObjectId>;
