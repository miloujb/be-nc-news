const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handlePSQLErrors,
  handleCustomErrors,
  handle500,
  methodNotAllowed
} = require("./errors/index");
const cors = require("cors");
app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);
app.all("/api", methodNotAllowed);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page Not Found" });
});

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500);
app.use(methodNotAllowed);

// app.use((err, req, res, next) => {
//   if (err.status === 404) res.status(404).send({ msg: err.msg });
//   else if (err.status === 405) res.status(405).send({msg: err.msg})
//   else if (err.code === '22P02'||'42703') res.status(400).send({ msg: 'Bad Request' });
//   else if (err.code === '23503') res.status(404).send({ msg: 'Page Not Found' })
//   else res.status(500).send({ msg: 'Internal Server Error' });
// });

module.exports = app;
