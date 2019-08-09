const articlesRouter = require('express').Router();
const { getArticleById, patchArticle, postCommentToArticle, getArticles, getComments
 } = require('../controllers/articles-controller')
 const { methodNotAllowed } = require('../errors/index')

articlesRouter.route('/').get(getArticles).all(methodNotAllowed)

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticle).all(methodNotAllowed)

articlesRouter.route('/:article_id/comments').post(postCommentToArticle).get(getComments).all(methodNotAllowed)

module.exports = articlesRouter;