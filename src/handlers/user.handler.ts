import { USER_NOT_FOUND } from '@constants';
import { prisma } from '@repositories';
import { UserDto } from '@dtos/out';
import { FastifyReply } from 'fastify';
import { AuthRequest } from '@interfaces';

async function getUserById(request: AuthRequest, reply: FastifyReply): Result<UserDto> {
    const userId: string = request.headers.userId;
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true
        },
        where: { id: userId }
    });
    if (user === null) return reply.badRequest(USER_NOT_FOUND);
    return user;
}

export const usersHandler = {
    getUserById
};
