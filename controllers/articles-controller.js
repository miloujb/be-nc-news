const { fetchArticleById, updateArticle } = require('../models/articles-model')

const getArticleById = (req, res, next) => {
    const { article_id }= req.params
    fetchArticleById(article_id)
    .then(article => {
        res.status(200).send({article})
    })
    .catch(next)
}

const patchArticle = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    updateArticle(article_id, inc_votes)
    .then(article => {
        res.status(200).send({article})
    })
    .catch(next)
}



module.exports = { getArticleById, patchArticle }