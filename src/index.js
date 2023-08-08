const express = require('express');
const loginRoute = require('./loginRoute');
const talkerRoute = require('./talkerRoute');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoute);

app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Online');
});
