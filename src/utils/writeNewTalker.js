const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = '../talker.json';
const talkerPath = path.resolve(__dirname, DATA_PATH);

const readData = async () => {
  try {
    const response = await fs.readFile(talkerPath);
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(`Erro na leitura do arquivo: ${error}`);
  }
};

const writeData = async (newTalker) => {
  try {
    const oldData = await readData();
    const newId = oldData[oldData.length - 1].id + 1;
    const newTalkerWithId = {
      id: newId,
      ...newTalker,
    };
  const updatedData = JSON.stringify([...oldData, newTalkerWithId], null, 2);
  await fs.writeFile(talkerPath, updatedData);
  return newTalkerWithId;
  } catch (error) {
    console.log(`Erro na escrita do arquivo: ${error}`);
  }
};

const deleteTalk = async (id) => {
  try {
    const oldData = await readData();
    const filteredData = oldData.filter((talker) => talker.id !== id);
    const updatedData = JSON.stringify(filteredData, null, 2);
    await fs.writeFile(talkerPath, updatedData);
  } catch (error) {
    console.log(`Erro ao deletar informações do arquivo: ${error}`);
  }
};

module.exports = {
  writeData,
  deleteTalk,
};