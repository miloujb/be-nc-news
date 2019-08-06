const connection = require('../db/data/connection');

const fetchUserById = ({username}) => {
    return connection
    .select('*').from('users')
    .where('username', username)
    .then((user) => {
    return user
    }
)}

module.exports = fetchUserById