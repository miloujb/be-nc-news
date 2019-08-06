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
  else if (err.code === '22P02') res.status(400).send({ msg: 'Bad Request' });
  else res.status(500).send({ msg: 'Internal Server Error' });
});



module.exports = app;