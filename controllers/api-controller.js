const json = require("../endpoints.json");

const getAll = (req, res, next) => {
  res.sendStatus(200).send(json);
};

module.exports = getAll;
