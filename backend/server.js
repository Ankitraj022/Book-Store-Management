const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Models
const { Book, Author, Customer, Order, Payment, Employee, Supplier } = require("./models");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// -------- CRUD Routes -------- //

// 📚 Books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find().populate("supplier_id");
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✍️ Authors
app.get("/authors", async (req, res) => {
    try {
        const authors = await Author.find();
        console.log(authors);
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//🧑 Customers
app.get("/customers", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📦 Orders
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().populate("customer_id");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 💳 Payments
app.get("/payments", async (req, res) => {
    try {
        const payments = await Payment.find().populate("order_id");
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 👥 Employees
app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚛 Suppliers
app.get("/suppliers", async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
