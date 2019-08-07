const { fetchArticleById, updateArticle, addNewCommentToArticle } = require('../models/articles-model')

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

const postCommentToArticle = (req, res, next) => {
    const { article_id } = req.params
    const {username, body} = req.body
    addNewCommentToArticle({article_id, author: username, body: body})
    .then(comment => {
        res.status(201).send({comment})
    })
    .catch(next)
};




module.exports = { getArticleById, patchArticle, postCommentToArticle }