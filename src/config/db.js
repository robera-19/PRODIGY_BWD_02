const mongoose = require('mongoose');

function getPoolOptions() {
  const maxPoolSize = parseInt(process.env.MONGO_MAX_POOL_SIZE || '10', 10);
  const minPoolSize = parseInt(process.env.MONGO_MIN_POOL_SIZE || '0', 10);
  const serverSelectionTimeoutMS = parseInt(process.env.MONGO_SERVER_SELECTION_MS || '30000', 10);
  return { maxPoolSize, minPoolSize, serverSelectionTimeoutMS };
}

async function connect(uri) {
  const opts = Object.assign(
    { useNewUrlParser: true, useUnifiedTopology: true },
    getPoolOptions()
  );
  await mongoose.connect(uri, opts);

  const { maxPoolSize, minPoolSize } = getPoolOptions();
  console.log(`Connected to MongoDB (pool min=${minPoolSize} max=${maxPoolSize})`);
}

module.exports = { connect };
