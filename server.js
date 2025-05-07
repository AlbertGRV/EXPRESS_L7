require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3030;


function readDB() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf8');
}

app.get('/tours', (req, res) => {
  try {
    const tours = readDB();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось загрузить туры' });
  }
});

app.get('/tours/:id', (req, res) => {
  const tours = readDB();
  const tour = tours.find(t => t.id === req.params.id);

  if (!tour) {
    return res.status(404).json({ error: 'Тур не найден' });
  }

  res.status(200).json(tour);
});

app.post('/tours', (req, res) => {
  const { destination, startDate, durationDays, price, availableSeats } = req.body;

  if (!destination || !startDate || !durationDays || !price || !availableSeats) {
    return res.status(400).json({ error: 'Заполните все обязательные поля' });
  }

  const newTour = {
    id: uuidv4(),
    destination,
    startDate,
    durationDays,
    price,
    availableSeats,
    createdAt: new Date().toISOString()
  };

  const tours = readDB();
  tours.push(newTour);
  writeDB(tours);

  res.status(201).json(newTour);
});

app.put('/tours/:id', (req, res) => {
  const tours = readDB();
  const index = tours.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Тур не найден' });
  }

  const updatedTour = {
    ...tours[index],
    ...req.body,
    id: tours[index].id,
    createdAt: tours[index].createdAt
  };

  tours[index] = updatedTour;
  writeDB(tours);

  res.status(200).json(updatedTour);
});

app.patch('/tours/:id', (req, res) => {
  const tours = readDB();
  const index = tours.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Тур не найден' });
  }

  if (tours[index].availableSeats <= 0) {
    return res.status(400).json({ error: 'Места закончились' });
  }

  tours[index].availableSeats -= 1;
  writeDB(tours);

  res.status(200).json(tours[index]);
});

app.delete('/tours/:id', (req, res) => {
  const tours = readDB();
  const filtered = tours.filter(t => t.id !== req.params.id);

  if (tours.length === filtered.length) {
    return res.status(404).json({ error: 'Тур не найден' });
  }

  writeDB(filtered);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});