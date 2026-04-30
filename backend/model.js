const mongoose = require("mongoose");

// Book Schema
const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }
});

// Author Schema
const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true }
});

// Customer Schema
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    address: { type: String, required: true }
});

// Order Schema
const OrderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    order_date: { type: Date, required: true },
    payment_date: { type: Date },
    status: { type: String, enum: ["Processing", "Shipped", "Delivered"], required: true }
});

// Payment Schema
const PaymentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    payment_date: { type: Date, required: true },
    amount: { type: Number, required: true },
    payment_mode: { type: String, enum: ["Credit Card", "Cash", "Online Transfer"], required: true }
});

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true }
});

// Supplier Schema
const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true }
});

// Exporting Models
const Book = mongoose.model("Book", BookSchema);
const Author = mongoose.model("Author", AuthorSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Order = mongoose.model("Order", OrderSchema);
const Payment = mongoose.model("Payment", PaymentSchema);
const Employee = mongoose.model("Employee", EmployeeSchema);
const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = { Book, Author, Customer, Order, Payment, Employee, Supplier };
