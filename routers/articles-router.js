const articlesRouter = require('express').Router();
const { getArticleById, patchArticle } = require('../controllers/articles-controller')

articlesRouter.get('/:article_id', getArticleById)
articlesRouter.patch('/:article_id', patchArticle)

module.exports = articlesRouter