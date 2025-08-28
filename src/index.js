require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('express').json;
const usersRouter = require('./routes/users');
const db = require('./config/db');

const app = express();
app.use(bodyParser());

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/users';

// Pooling and connection options (configurable via env)
const maxPoolSize = parseInt(process.env.MONGO_MAX_POOL_SIZE || '10', 10);
const minPoolSize = parseInt(process.env.MONGO_MIN_POOL_SIZE || '0', 10);
const serverSelectionTimeoutMS = parseInt(process.env.MONGO_SERVER_SELECTION_MS || '30000', 10);

async function start() {
  await db.connect(MONGO_URI);
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
