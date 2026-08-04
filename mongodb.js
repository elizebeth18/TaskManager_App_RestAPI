//CRUD - Create Read Update Delete

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(connectionURL);

const startServer = async () => {
    await client.connect();
    console.log("DB Connected!!")
}

startServer();