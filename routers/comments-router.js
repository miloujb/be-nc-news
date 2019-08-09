const commentsRouter = require('express').Router();
const { patchVotesToComment, removeComment } = require('../controllers/comments-controller')

commentsRouter.route('/:comment_id').patch(patchVotesToComment).delete(removeComment)

module.exports = commentsRouter