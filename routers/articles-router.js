const articlesRouter = require('express').Router();
const { getArticleById, patchArticle, postCommentToArticle, getArticles, getComments
 } = require('../controllers/articles-controller')

articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticle)

articlesRouter.route('/:article_id/comments').post(postCommentToArticle).get(getComments)

module.exports = articlesRouter;