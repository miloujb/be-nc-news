exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "42703" || err.code === "23502")
    res.status(400).send({ msg: "Bad Request" });
  else if (err.code === "23503")
    res.status(404).send({ msg: "Page Not Found" });
  else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status)
    res.status(err.status).send({ msg: err.msg || "Page Not Found" });
  else next(err);
};

exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
