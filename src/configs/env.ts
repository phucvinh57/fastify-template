import * as dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENT = !process.env.NODE_ENV ? 'development' : (process.env.NODE_ENV as Environment);
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const COOKIE_SECRET = process.env.COOKIE_SECRET as string;
export const CORS_WHITE_LIST = process.env.CORS_WHITE_LIST === undefined ? [] : process.env.CORS_WHITE_LIST.split(',');
