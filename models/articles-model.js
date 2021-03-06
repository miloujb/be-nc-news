const connection = require('../db/connection')

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
    .increment('votes', inc_votes || 0)
    .where('articles.article_id', '=', article_id)
    .returning('*')
    .then(article => {
        if(!article) return Promise.reject({msg: 'Page Not Found', status: 404})
        else return article[0]
    })
}

const addNewCommentToArticle = (article_id, username, body) => {
    return connection
    .insert(article_id, username, body)
    .into('comments')
    .returning('*')
    .then(comments => {
        if(!comments[0].body)
        return Promise.reject({msg: 'Page Not Found', status: 404})
        else return comments[0]
    })
};

const fetchArticles = ({sort_by = 'created_at', order = 'desc', author, topic}) => {
    return connection
    .select('articles.*')
    .from('articles')
    .orderBy(sort_by, order)
    .count({comment_count:'comments.article_id'})
    .leftJoin('comments', 'articles.article_id' , '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .modify(filteringQuery => {
        if(author) filteringQuery.where('articles.author', '=', author)
        if(topic) filteringQuery.where('articles.topic', '=', topic)
    })
    .then(articles => {
        if(!articles.length)
        return Promise.reject({msg: 'Page Not Found', status: 404})
        else return articles;
    })
}

const fetchComments = (article_id, {sort_by, order}) => {
    return connection
    .select('*')
    .from('comments')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .where('comments.article_id', '=', article_id)
    .then(comments => {
        if (!comments) return Promise.reject({msg: 'Page Not Found', status: 404})
        return Promise.all([comments, fetchArticleById(article_id)])
    })
    .then(([comments]) => comments)
}


module.exports = { fetchArticleById, updateArticle, addNewCommentToArticle, fetchArticles, fetchComments }