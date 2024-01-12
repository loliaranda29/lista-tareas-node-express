const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();
const jwt = require('jsonwebtoken');

const taskFunctionsRouter = require('./taskFunctions');

app.use(express.json());

app.use('/api', taskFunctionsRouter);

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(405).send("Método no permitido.");
  }
  next();
});

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto: ${port}`);
});