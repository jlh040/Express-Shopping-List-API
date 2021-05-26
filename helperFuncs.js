function isDuplicate(req, shoppingList) {
    for (let item of shoppingList) {
        if (item.name === req.body.name) {
            throw new ExpressError('Item is already in shopping list', 400);
        }
    }
    return false;
}

function isMissingData(req) {
    if (!('name' in req.body) || !('price' in req.body)) {
        throw new ExpressError('Item is missing data', 400);
    }
}

module.exports = {
    isDuplicate,
    isMissingData
}