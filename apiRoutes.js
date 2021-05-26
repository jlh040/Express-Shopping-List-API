const express = require('express');
const router = new express.Router();
const { isDuplicate, isMissingData } = require('./helperFuncs');
const items = require('./fakeDb');

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














module.exports = router;