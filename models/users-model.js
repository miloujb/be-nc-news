const connection = require('../db/data/connection');

const fetchUserById = ({username}) => {
    return connection
    .select('*').from('users')
    .where('username', username)
    .then((user) => {
        if(!user.length)
        return Promise.reject({msg: 'Page Not Found', status: 404})
   else return user; 
    }
)}

module.exports = fetchUserById