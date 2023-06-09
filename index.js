const express = require('express');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 3000;
const URI = process.env.URI_MONGODB

async function connect() {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('users');
    const collection = db.collection('infos');
    return collection;
}

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/', async (req, res) => {

    const collection = await connect();
    const result = await collection.find({}).toArray();

    res.send(result);
    
})

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}.`);
    
})