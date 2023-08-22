import { ObjectId } from '@dtos/common';
import { Static, Type } from '@sinclair/typebox';

export const UserDto = Type.Object({
    id: ObjectId,
    email: Type.String({ format: 'email' })
});

export type UserDto = Static<typeof UserDto>;
