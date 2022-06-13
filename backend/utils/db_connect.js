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
        } else if (method === 'insert') {
            result = await collection.insert(arg);
        }
        return await result.toArray();
    }
    catch(err){ console.error(err); } 
    finally{ client.close(); }
};

module.exports = { db };
