const express = require('express');
const app = express();
const apiRoutes = require('./apiRoutes');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', apiRoutes);

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
        error: {
            message,
            status
        }
    })
})


module.exports = app