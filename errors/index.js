exports.handlePSQLErrors = (err, req, res, next) => {}

exports.handleCustomErrors = (err, req, res, next) => {
    res.status(404).send({ msg: err.msg });
}

exports.handle500 = (err, req, res, next) => {}