require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;