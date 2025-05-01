const { readDB, writeDB } = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getAllTours = async () => {
  const db = await readDB();
  return db.tours;
};

exports.getTourById = async (id) => {
  const db = await readDB();
  return db.tours.find(tour => tour.id === id);
};

exports.createTour = async (tourData) => {
  const db = await readDB();
  const newTour = { id: uuidv4(), ...tourData };
  db.tours.push(newTour);
  await writeDB(db);
  return newTour;
};

exports.updateTour = async (id, tourData) => {
  const db = await readDB();
  const index = db.tours.findIndex(tour => tour.id === id);
  if (index === -1) throw new Error('Tour not found');
  db.tours[index] = { ...db.tours[index], ...tourData };
  await writeDB(db);
  return db.tours[index];
};

exports.patchTour = async (id, updateData) => {
  const db = await readDB();
  const tour = db.tours.find(tour => tour.id === id);
  if (!tour) throw new Error('Tour not found');
  Object.assign(tour, updateData);
  await writeDB(db);
  return tour;
};

exports.deleteTour = async (id) => {
  const db = await readDB();
  const index = db.tours.findIndex(tour => tour.id === id);
  if (index === -1) throw new Error('Tour not found');
  db.tours.splice(index, 1);
  await writeDB(db);
};