const app = require("../server");
const supertest = require("supertest");
// we also need our app for the correct routes!
// const User = require('../models/userModel');

// const userOne = {
//     username: 'Mike',
//     email: 'mike@example.com',
//     password: 'mikeoggy'
// }
// beforeEach(  async() => {
//    await User.deleteMany();
//    await new User(userOne).save();
// });

// afterEach(() => {
//     console.log('After Each')
// });

beforeEach(() => {
    jest.useFakeTimers()
})

describe('GET /api/v1/users', () => {
    it('should respond with an array of users', async () => {
      const response = await supertest(app)
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body.length).toBeGreaterThan(0);
    });
});


// Running all pending timers and switching to real timers using Jest
afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })