const { MongoClient } = require('mongodb');
const env = require('dotenv').config().parsed;

async function db(method, collect, arg) {
    const client = await MongoClient.connect(env.MONGOURL, { useNewUrlParser: true });
    const database = client.db(env.MONGODB);
    try{
        const collection = database.collection(collect);
        let result;
        if (method === 'find') {
            result = await collection.find(arg);
            return await result.toArray();
        } else if (method === 'insert') {
            result = await collection.insertOne(arg);
            return result;
        }
    }
    catch(err){ console.error(err); } 
    finally{ client.close(); }
};

module.exports = { db };
