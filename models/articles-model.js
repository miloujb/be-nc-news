const connection = require('../db/data/connection')

const fetchArticleByArticleId = (article_id) => {
    return connection
    .first('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .count('comments.article_id AS comment_count')
    .groupBy('articles.article_id') 
    .where('articles.article_id', '=', article_id)
    .then(article => {
        console.log(article)
        return article
    })
}



module.exports = fetchArticleByArticleId