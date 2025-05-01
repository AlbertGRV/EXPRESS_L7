const fs = require('fs/promises');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

exports.readDB = async () => {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
};

exports.writeDB = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
};