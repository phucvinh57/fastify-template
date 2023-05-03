import { ID_LENGTH } from '@constants';
import s from 'fluent-json-schema';

export const idSchema = s.string().minLength(ID_LENGTH).maxLength(ID_LENGTH);
export const nullable = { nullable: true };
