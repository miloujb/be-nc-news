const connection = require('../db/data/connection')

const updateComment = (comment_id, inc_votes) => {
    return connection
    .from('comments')
    .increment('votes', inc_votes)
    .where('comments.comment_id', '=', comment_id)
    .returning('*')
    .then(article => {
        return article[0]
    })
}

module.exports = updateComment