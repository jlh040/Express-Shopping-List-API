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

router.patch('/:name', (req, res, next) => {
    try {
        let itemIdx = items.findIndex(item => item.name === req.params.name);
        if (itemIdx === -1) throw new ExpressError('Item Not Found', 404);

        items[itemIdx].name = req.body.name || items[itemIdx].name;
        items[itemIdx].price = req.body.price || items[itemIdx].price;

        return res.json({
            updated: items[itemIdx]
        })
    }
    catch(e) {
        return next(e);
    }
});

router.delete('/:name', (req, res, next) => {
    try {
        const itemIdx = items.findIndex(item => item.name === req.params.name);
        if (itemIdx === -1) throw new ExpressError('Item not found', 404);

        items.splice(itemIdx, 1);
        return res.json({message: 'Deleted'});

    }
    catch(e) {
        return next(e)
    }
})
    














module.exports = router;