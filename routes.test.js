process.env.NODE_ENV = 'test';

const app = require('./app');
const request = require('supertest');
const items = require('./fakeDb');

beforeEach(function() {
    const jacket = {name: 'jacket', price: 34.99};
    
    items.push(jacket);
})

afterEach(function() {
    items.length = 0;
})

describe('GET /items', () => {
    test('Do we receive the correct status code?', async () => {
        const response = await request(app).get('/items')

        expect(response.statusCode).toBe(200);
    })
})