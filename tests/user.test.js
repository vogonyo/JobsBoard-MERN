const request = require('supertest');

const app = require('../app');

test('Should signup a new user', async() => {
    await request(app).post('/api/v1/users').send({
       username: 'Drew',
       email: 'Drew@example.com',
       password: 'Mypassword2021'
    }).expect(201)
});