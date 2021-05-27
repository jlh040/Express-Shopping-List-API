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

describe('GET /items/:name', () => {
    test('Can we request an item by name?', async () => {
        const resp = await request(app).get('/items/jacket');

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(jacket);
    });

    test('Do we get a 404 for an invalid name?', async function() {
        const resp = await request(app).get('/items/raincoat');
        
        expect(resp.statusCode).toBe(404);
    })
})

describe('POST /items', () => {
    test('Do we get a 201 status code?', async () => {
        const response = await request(app).post('/items').send({name: 'Hat', 'price': 15.99});

        expect(response.statusCode).toBe(201);
    });

    test('Can we add a product to the shopping list?', async () => {
        const response = await request(app).
            post('/items').
            send({name: 'Hat', 'price': 15.99});
        
        expect(response.body).toEqual({added: {name: 'Hat', 'price': 15.99}});

    })
})

