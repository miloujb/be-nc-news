const sendAll = require('../models/json-model')

const getAll = (req, res, next) => {
    const json = sendAll();
    res(200).send(json)
}

module.exports = getAll