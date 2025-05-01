const { readDB, writeDB } = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getAllClients = async () => {
  const db = await readDB();
  return db.clients;
};

exports.getClientById = async (id) => {
  const db = await readDB();
  return db.clients.find(client => client.id === id);
};

exports.createClient = async (clientData) => {
  const db = await readDB();
  const newClient = { id: uuidv4(), ...clientData };
  db.clients.push(newClient);
  await writeDB(db);
  return newClient;
};

exports.updateClient = async (id, clientData) => {
  const db = await readDB();
  const index = db.clients.findIndex(client => client.id === id);
  if (index === -1) throw new Error('Client not found');
  db.clients[index] = { ...db.clients[index], ...clientData };
  await writeDB(db);
  return db.clients[index];
};

exports.patchClient = async (id, updateData) => {
  const db = await readDB();
  const client = db.clients.find(client => client.id === id);
  if (!client) throw new Error('Client not found');
  Object.assign(client, updateData);
  await writeDB(db);
  return client;
};

exports.deleteClient = async (id) => {
  const db = await readDB();
  const index = db.clients.findIndex(client => client.id === id);
  if (index === -1) throw new Error('Client not found');
  db.clients.splice(index, 1);
  await writeDB(db);
};