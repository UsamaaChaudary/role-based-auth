require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appRoot = require('app-root-path');


const api = require(appRoot + '/src/api');

const passport = require('./passport');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/OOP' , { useNewUrlParser: true, useUnifiedTopology: true }, function () {
  console.log('database connected');
});

app.get('/', (req, res) => res.send('Express Server'));

app.use('/api', api);


app.listen(PORT || 7000, () => console.log(`server listening at ${PORT}`));