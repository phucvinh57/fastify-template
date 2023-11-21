export const TRY_LATER = 'Some errors occured ! Please try later !';

export const USER_NOT_FOUND = 'User not found !';
export const DUPLICATED_EMAIL = 'Email already exists !';
export const LOGIN_FAIL = 'Incorrect login information !';
export const MUST_LOGIN_FIRST = 'Login first !';
export const INVALID_TOKEN = 'Invalid token !';
export const NOT_FOUND_GENERIC = 'Not found !';

export enum PrismaErrCode {
    UNIQUE_CONSTRAINT = 'P2002',
    NOT_VALID_ID = 'P2023',
    NOT_FOUND = 'P2025'
}
