const express = require('express');
const ExpressError = require('./expressError');
const apiRoutes = require('./apiRoutes');
const items = require('./fakeDb');

const app = express();

app.use('/items', apiRoutes);
app.use(express.json());

// If the URL is not matched, this middleware will throw a 404 error
app.use((req, res, next) => {
    const err = new ExpressError('Resource not found', 404);
    return next(err)
})

// Global error handler
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    res.status(status).json({
        message,
        status
    })
})

module.exports = app