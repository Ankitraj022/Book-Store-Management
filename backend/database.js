const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Default MongoDB connection URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client.db("bookstore"); // Replace with your database name
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;
