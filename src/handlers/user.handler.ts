import { USER_NOT_FOUND } from '@constants';
import { prisma } from '@repositories';
import { UserDto } from '@dtos/out';
import { Handler } from '@interfaces';

const getUserById: Handler<UserDto> = async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true
        },
        where: { id: userId }
    });
    if (user === null) return res.badRequest(USER_NOT_FOUND);
    return user;
};

export const usersHandler = {
    getUserById
};
