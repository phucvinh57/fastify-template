import { envs } from '@configs';
import { INVALID_TOKEN, MUST_LOGIN_FIRST } from '@constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.token;

    if (!token) return reply.forbidden(MUST_LOGIN_FIRST);

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedPayload: any = jwt.verify(token, envs.JWT_SECRET);
        request.headers['userId'] = decodedPayload['userId'];
        return;
    } catch (err) {
        request.log.info(err);
        return reply.forbidden(INVALID_TOKEN);
    }
}
