const usersRouter = require('express').Router();
const getUserById = require('../controllers/users-controller')
const { methodNotAllowed } = require('../errors/index')

usersRouter.route('/:username').get(getUserById).all(methodNotAllowed)


module.exports = usersRouter;