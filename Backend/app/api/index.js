const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
// console.log('MONGO_URI:', process.env.MONGO_URI);
// console.log('PORT:', process.env.PORT);
// console.log('CORSURL:', process.env.CORSURL);
// console.log('DUMMY_PRODUCTS:', process.env.DUMMY_PRODUCTS);
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:4200', 'http://127.0.0.1:5500'],
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => {
      console.error('Connection error', err);
      process.exit();
  }
);

require('../routes/user.routes')(app);
require('../routes/shop_items.routes')(app);

app.listen(process.env.PORT, () => {
  console.log(`Servidor Express en el puerto ${process.env.PORT}`);
});
