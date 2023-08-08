const fs = require('fs/promises');
const path = require('path');

const talker = path.resolve(__dirname, '../talker.json');

const readFiles = async () => {
  try {
    const response = await fs.readFile(talker);
    return JSON.parse(response);
  } catch (er) {
    return console.error(`Error message: ${er}`);
  }
};

module.exports = readFiles;