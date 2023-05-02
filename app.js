const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;

const { PORT = 3000 } = process.env;

const { errors } = require('./middlewares/errors');

const router = require('./routes/index');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(validationErrors());
app.use(errors);

app.listen(PORT);
