const express = require("express");
const cors = require("cors"); // Import cors
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow all origins (or restrict to frontend)
app.use(express.json()); // To handle JSON data if needed

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        return client.db("bookstore"); // Explicitly use "bookstore" DB
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

connectDB().then((db) => {
    app.get("/", (req, res) => {
        res.send("Server is running and connected to MongoDB ✅");
    });

    // Route to fetch books
    app.get("/books", async (req, res) => {
        try {
            const booksCollection = db.collection("books");
            const books = await booksCollection.find().toArray();
            res.json(books);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.get("/authors", async (req, res) => {
        try {
            const booksCollection = db.collection("authors");
            const authors = await booksCollection.find().toArray();
            res.json(authors);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.get("/customers", async (req, res) => {
        try {
            const booksCollection = db.collection("customers");
            const customers = await booksCollection.find().toArray();
            res.json(customers);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.get("/employees", async (req, res) => {
        try {
            const booksCollection = db.collection("employees");
            const employees = await booksCollection.find().toArray();
            res.json(employees);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.get("/orders", async (req, res) => {
        try {
            const booksCollection = db.collection("orders");
            const orders = await booksCollection.find().toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.get("/payments", async (req, res) => {
        try {
            const booksCollection = db.collection("payments");
            const payments = await booksCollection.find().toArray();
            res.json(payments);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.get("/suppliers", async (req, res) => {
        try {
            const booksCollection = db.collection("suppliers");
            const suppliers = await booksCollection.find().toArray();
            res.json(suppliers);
        } catch (err) {
            res.status(500).json({ message: "Error fetching books", error: err });
        }
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Failed to connect to DB. Server not started.");
});

