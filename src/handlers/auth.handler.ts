import { FastifyReply, FastifyRequest } from 'fastify';
import { compare, hash } from 'bcrypt';
import { prisma } from '@repositories';
import { cookieOptions, DUPLICATED_EMAIL, LOGIN_FAIL, SALT_ROUNDS, USER_NOT_FOUND } from '@constants';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@configs';
import { User } from '@prisma/client';
import { AuthInputDto } from '@dtos/in';
import { AuthResultDto } from '@dtos/out';

async function login(request: FastifyRequest<{ Body: AuthInputDto }>, reply: FastifyReply): Result<AuthResultDto> {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            password: true
        },
        where: { email: request.body.email }
    });
    if (!user) return reply.badRequest(USER_NOT_FOUND);

    const correctPassword = await compare(request.body.password, user.password);
    if (!correctPassword) return reply.badRequest(LOGIN_FAIL);

    const userToken = jwt.sign({ userId: user.id }, JWT_SECRET);
    reply.setCookie('token', userToken, cookieOptions);

    return {
        id: user.id,
        email: user.email
    };
}

async function signup(request: FastifyRequest<{ Body: AuthInputDto }>, reply: FastifyReply): Promise<AuthResultDto | void> {
    const hashPassword = await hash(request.body.password, SALT_ROUNDS);
    let user: User;
    try {
        user = await prisma.user.create({
            data: {
                email: request.body.email,
                password: hashPassword
            }
        });
    } catch (err) {
        return reply.badRequest(DUPLICATED_EMAIL);
    }

    const userToken = jwt.sign({ userId: user.id }, JWT_SECRET);
    reply.setCookie('token', userToken, cookieOptions);

    return {
        id: user.id,
        email: user.email
    };
}

export const authHandler = {
    login,
    signup
};
