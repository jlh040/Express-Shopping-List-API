process.env.NODE_ENV = 'test';

const app = require('./app');
const request = require('supertest');
const items = require('./fakeDb');

const jacket = {name: 'jacket', price: 34.99};

beforeEach(function() {    
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

    test('Do we receive an array containing all items?', async () => {
        const response = await request(app).get('/items');

        expect(response.body).toEqual([jacket]);
    })
})