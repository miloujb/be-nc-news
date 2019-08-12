const sendAll = require('../models/api-model')


const getAll = (req, res, next) => {
    sendAll()
    .then(json => {
        res(200).send(json)
    })
    .catch(next)
}

module.exports = getAll