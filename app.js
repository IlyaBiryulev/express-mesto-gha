const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const rootRouter = require('./routes/index');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6442b89f2264795b94d51172',
  };

  next();
});

app.use(rootRouter);

app.listen(PORT);
