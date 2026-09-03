const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);
let database;

async function connectMongo() {
  await client.connect();
  database = client.db(process.env.MONGO_DATABASE);
  console.log('MongoDB conectado:', process.env.MONGO_DATABASE);
  return database;
}

function getMongoDatabase() {
  if (!database) {
    throw new Error('MongoDB todavía no ha sido conectado.');
  }
  return database;
}

module.exports = {
  connectMongo,
  getMongoDatabase,
};
