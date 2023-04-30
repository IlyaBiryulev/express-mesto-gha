const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');
const {
  login,
  createUser,
} = require('./controllers/users');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6442b89f2264795b94d51172',
  };

  next();
});

app.use(cardRouter);
app.use(userRouter);
app.use(notFoundRouter);

app.post('/signin', login);
app.post('/signup', createUser);

app.listen(PORT);
