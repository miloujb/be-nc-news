const { updateComment, deleteComment } = require('../models/comments-model')

const patchVotesToComment = (req, res, next) => {
    const {comment_id} = req.params
    const {inc_votes} = req.body
    updateComment(comment_id, inc_votes)
    .then(comment => {
        res.status(200).send({comment})
    })
    .catch(next)
}

const removeComment = (req, res, next) => {
    console.log(req.params)
    const {comment_id} = req.params
    deleteComment(comment_id)
    .then(comment => {
        res.sendStatus(204)
    })
    .catch(next)
}

module.exports = { patchVotesToComment, removeComment }