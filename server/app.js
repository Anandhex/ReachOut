const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/users', userRoutes);

module.exports = app;
