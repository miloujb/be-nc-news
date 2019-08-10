const fetchUsersById = require('../models/users-model')

const getUsersById = (req, res, next) => {
    const {username}  = req.params;
    fetchUsersById(username)
    .then(user => {
       res.status(200).send({user});
    })
    .catch(next)
}



module.exports = getUsersById