import { supertest } from '@testUtils';
import { faker } from '@faker-js/faker';

describe('Test auth handler', () => {
    const account = {
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password() + '1@A_'
    };
    test('Sign up', async () => {
        const { body } = await supertest.post('/auth/signup').send(account).expect(200);
        expect(body).toHaveProperty('id');
        expect(body.email).toBe(account.email);
    });

    test('Login', async () => {
        const { body } = await supertest.post('/auth/login').send(account).expect(200);
        expect(body).toHaveProperty('id');
        expect(body.email).toBe(account.email);
    });
});
