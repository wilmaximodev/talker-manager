const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const talker = path.resolve(__dirname, '../talker.json');
const readFiles = require('../utils/readFiles');
const {
    validToken,
    validAge,
    validName,
    validTalk,
    validateWatchedAtOnBody,
    validRate,
} = require('../middlewares/checkTalker');
const { writeData, deleteTalk } = require('../utils/writeNewTalker');

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

talkerRoute.put('/:id',
validToken,
validName, 
validAge, 
validTalk, 
validateWatchedAtOnBody,
validRate,
async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFiles();
    const index = talkers.findIndex((element) => element.id === Number(id));
    if (index < 0) {
      return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkers[index] = { id: Number(id), ...req.body };
    const updatedTalker = JSON.stringify(talkers, null, 2);
    await fs.writeFile(talker, updatedTalker);
    return res.status(200).json(talkers[index]);
  } catch (err) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

talkerRoute.delete('/:id', 
  validToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTalk(Number(id));
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = talkerRoute;