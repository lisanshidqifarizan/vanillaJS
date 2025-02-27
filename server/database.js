require("dotenv").config();
const {
    MongoClient
} = require("mongodb");

const DB_URL = process.env.MONGO_URI;
const client = new MongoClient(DB_URL);
const dbName = "veomyid";

async function getPosts() {
    await client.connect();
    const db = client.db(dbName);
    const posts = await db.collection("posts").find().toArray();
    return posts;
}

module.exports = {
    getPosts
};