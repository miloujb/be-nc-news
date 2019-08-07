const articlesRouter = require('express').Router();
const { getArticleById, patchArticle, postCommentToArticle } = require('../controllers/articles-controller')

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticle)

articlesRouter.route('/:article_id/comments').post(postCommentToArticle)

module.exports = articlesRouter;