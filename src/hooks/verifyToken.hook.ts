import { envs } from '@configs';
import { INVALID_TOKEN, MUST_LOGIN_FIRST } from '@constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export async function verifyToken(req: FastifyRequest, res: FastifyReply) {
    const token = req.cookies.token;

    if (!token) return res.unauthorized(MUST_LOGIN_FIRST);

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedPayload: any = jwt.verify(token, envs.JWT_SECRET);
        req.userId = decodedPayload['userId'];
        return;
    } catch (err) {
        req.log.info(err);
        return res.forbidden(INVALID_TOKEN);
    }
}
