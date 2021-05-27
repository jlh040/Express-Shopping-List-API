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

    test('Do we get a 400 status code if we have missing data?', async () => {
        const response = await request(app)
            .post('/items')
            .send({name: 'trenchcoat'});

        expect(response.statusCode).toBe(400);
    });

    test('Do we get a 400 status code if we have duplicate data?', async () => {
        const res = await request(app)
            .post('/items')
            .send({name: 'jacket', price: 34.99});

        expect(res.statusCode).toBe(400);
    })
})

describe('PATCH /items/:name', () => {
    test('Can we update an item?', async () => {
        const res = await request(app)
            .patch('/items/jacket')
            .send({price: 89.99});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: jacket});
    })

    test('Do we get a 404 status code if an item is not found?', async () => {
        const res = await request(app)
            .patch('/items/computer')
            .send({name: 'jacket', price: 34.99});

        expect(res.statusCode).toEqual(404);
    })
})

describe('DELETE /items/:name', () => {
    test('Can we delete an item from our shopping list?', async function() {
        const res = await request(app)
            .delete('/items/jacket');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    });

    test('Do we get a 404 if the item is not found?', async function() {
        const res = await request(app)
            .delete('/items/snowboots');

        expect(res.statusCode).toBe(404);
    })
})