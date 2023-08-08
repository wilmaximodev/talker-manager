const express = require('express');
const readFiles = require('./utils/readFiles');
const {
    validToken,
    validAge,
    validName,
    validTalk,
    validateWatchedAtOnBody,
    validRate,
} = require('./middlewares/checkTalker');
const writeData = require('./utils/writeNewTalker');

const talkerRoute = express.Router();

talkerRoute.get('/', async (req, res) => {
  try {
    const result = await readFiles();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.sqlMessage });
  }
});
  
talkerRoute.get('/:id', async (req, res) => {
  const findTalker = await readFiles();
  const { id } = req.params;
  const findId = findTalker.find((talk) => +talk.id === +id);
  if (findId) {
    return res.status(200).json(findId);
  }
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

talkerRoute.post('/', 
  validToken, 
  validName, 
  validAge, 
  validTalk, 
  validateWatchedAtOnBody,
  validRate, 
  async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const newTalker = await writeData({ name, age, talk });
    res.status(201).json(newTalker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = talkerRoute;