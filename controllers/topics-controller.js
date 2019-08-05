const fetchTopics = require('../models/topics-model')

const getTopics = (req, res, next) => {
    fetchTopics(req.query)
    .then(topics => {
        res.status(200).send({topics});
    })
    .catch(err =>next(err));
}

module.exports = getTopics