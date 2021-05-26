const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
const items = require('./fakeDb');
const { isDuplicate, isMissingData } = require('./helperFuncs');

router.get('/', (req, res) => {
    res.json(items);
});

router.post('/', (req, res, next) => {
    try {
        isDuplicate(req)
        isMissingData(req)

        items.push(req.body);
        return res.status(201).json({added: req.body});
    }
    catch(e) {
        return next(e);
    }
})

router.get('/:name', (req, res, next) => {
    try {
        const item = items.find(item => item.name === req.params.name);
        if (!item) throw new ExpressError('Item Not Found', 404);

        return res.json(item);
    }
    catch(e) {
        return next(e);
    }
})














module.exports = router;