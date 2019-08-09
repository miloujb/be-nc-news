exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '22P02') res.status(400).send({ msg: 'Bad Request' });
    else if (err.code === '23503'||'42703') res.status(404).send({ msg: 'Page Not Found' })
}

exports.handleCustomErrors = (err, req, res, next) => {
    res.status(404).send({ msg: 'Page Not Found' });
}

exports.methodNotAllowed = (req, res, next) => {
    res.status(405).send({msg: 'Method Not Allowed'})
}

exports.handle500 = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
}
