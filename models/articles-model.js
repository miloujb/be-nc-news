const connection = require('../db/data/connection')

const fetchArticleById = (article_id) => {
    return connection
    .first('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy('articles.article_id') 
    .where('articles.article_id', '=', article_id)
    .then(article => {
        if(!article)
        return Promise.reject({msg: 'Page Not Found', status: 404})
        else return article
    })
}

const updateArticle = (article_id, inc_votes) => {
    return connection
    .from('articles')
    .increment('votes', inc_votes) 
    .where('articles.article_id', '=', article_id)
    .returning('*')
    .then(article => {
        if(!article.length) 
        return Promise.reject({msg: 'Page Not Found', status: 404})
        else return article[0]
    })
}

const addNewCommentToArticle = (article_id, username, body) => {
    return connection
    .insert(article_id, username, body)
    .into('comments')
    .returning('*')
    .then(comments => {
        if(!comments.length)
        return Promise.reject({msg: 'Page Not Found', status: 404})
        else return comments[0]
    })
};


module.exports = { fetchArticleById, updateArticle, addNewCommentToArticle }