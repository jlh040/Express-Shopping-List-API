const express = require('express');
const router = new express.Router();
const { isDuplicate, isMissingData } = require('./helperFuncs');

router.get('/', (req, res) => {
    res.json(items);
});

router.post('/items', (req, res, next) => {
    const newItem = req.body;
    try {
        isDuplicate(req, items)
        isMissingData(req)

        items.push(newItem);
        return res.status(201).json({added: newItem});
    }
    catch(e) {
        return next(e);
    }
})














module.exports = router;