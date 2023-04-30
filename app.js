const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;

const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
/* const loginRouter = require('./routes/signin');
const authRouter = require('./routes/signup'); */
const notFoundRouter = require('./routes/notFound');
const { login, createUser } = require('./controllers/users');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
/* app.use('/signin', loginRouter);
app.use('/signup', authRouter); */
app.use(notFoundRouter);

app.listen(PORT);
