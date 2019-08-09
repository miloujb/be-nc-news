const commentsRouter = require('express').Router();
const { patchVotesToComment, removeComment } = require('../controllers/comments-controller')
const { methodNotAllowed } = require('../errors/index')

commentsRouter.route('/:comment_id').patch(patchVotesToComment).delete(removeComment).all(methodNotAllowed)

module.exports = commentsRouter