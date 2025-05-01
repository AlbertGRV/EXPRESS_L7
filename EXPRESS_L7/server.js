const express = require('express');
const bodyParser = require('body-parser');
const tourRoutes = require('./src/routes/tourRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/v1/tours/', tourRoutes);
app.use('/api/v1/clients/', clientRoutes); 

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});