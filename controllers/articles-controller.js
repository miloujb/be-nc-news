const { fetchArticleById, updateArticle, addNewCommentToArticle, fetchArticles, fetchComments } = require('../models/articles-model')

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

const getArticles = (req, res, next) => {
    fetchArticles(req.query)
    .then(articles => {
        res.status(200).send({articles})
    })
    .catch(next)
}

const getComments = (req, res, next) => {
    const {article_id} = req.params
    fetchComments(article_id, req.query)
    .then(comments => {
        console.log('in the controller')
        res.status(200).send({comments})
    })
    .catch(next)
}


module.exports = { getArticleById, patchArticle, postCommentToArticle, getArticles, getComments }