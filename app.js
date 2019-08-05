const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router')

app.use(express.json());
const apiRouter = ('/api', apiRouter)

module.exports = app;