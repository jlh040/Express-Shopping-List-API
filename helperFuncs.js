const items = require('./fakeDb');
const ExpressError = require('./expressError');

function isDuplicate(req, res) {
    if (items.length === 0) return;
    
    for (let item of items) {
        if (item.name === req.body.name) {
            throw new ExpressError('Item is already in shopping list', 400);
        }
    }
    return false;
}

function isMissingData(req, res) {
    if (!(req.body.name && req.body.price)) {
        throw new ExpressError('Item is missing data', 400);
    }
}

module.exports = {
    isDuplicate,
    isMissingData
}