const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router')

app.use(express.json());

app.use('/api', apiRouter)

app.all('/*', (req, res, next) => {
    next({ status: 404, msg: 'Page Not Found' });
  });

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: err.msg });
  else if (err.status === 400) res.status(400).send({msg: err.msg});
});

module.exports = app;