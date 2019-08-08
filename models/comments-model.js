const connection = require('../db/data/connection')

const updateComment = (comment_id, inc_votes) => {
    return connection
    .from('comments')
    .increment('votes', inc_votes)
    .where('comments.comment_id', '=', comment_id)
    .returning('*')
    .then(article => {
        if(!article) return Promise.reject({msg: 'Page Not Found', status: 404})
        else return article[0]
    })
}

module.exports = updateComment