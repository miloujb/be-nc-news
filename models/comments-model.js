const connection = require('../db/connection')

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

const deleteComment = (comment_id) => {
    return connection
    .from('comments')
    .where('comment_id', '=', comment_id)
    .del()
    .then(comment => {
        if(!comment) return Promise.reject({msg: 'Page Not Found', status: 404})
    })
}

module.exports = { updateComment, deleteComment }