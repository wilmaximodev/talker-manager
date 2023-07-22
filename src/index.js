const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talker = path.resolve(__dirname, './talker.json');

const readFile = async () => {
  try {
    const response = await fs.readFile(talker);
    return JSON.parse(response);
  } catch (er) {
    return console.error(`Error message: ${er}`);
  }
};

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const result = await readFile();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.sqlMessage });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
