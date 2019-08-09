const connection = require('../db/data/connection');

const fetchTopics = () => {
    return connection
    .select('*').from('topics')
}

module.exports = fetchTopics;