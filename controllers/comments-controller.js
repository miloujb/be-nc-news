const updateComment = require('../models/comments-model')

const patchVotesToComment = (req, res, next) => {
    const {comment_id} = req.params
    const {inc_votes} = req.body
    updateComment(comment_id, inc_votes)
    .then(comment => {
        res.status(200).send({comment})
    })
    .catch(next)
}

module.exports = patchVotesToComment