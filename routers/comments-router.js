const commentsRouter = require('express').Router();
const patchVotesToComment = require('../controllers/comments-controller')

commentsRouter.route('/:comment_id').patch(patchVotesToComment)

module.exports = commentsRouter