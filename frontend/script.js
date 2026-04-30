document.addEventListener("DOMContentLoaded", () => {
    showToast("Welcome to the Bookstore Management System! 🎉", "success");

    fetchAndRender("books", "book-list", bookTemplate);
    fetchAndRender("authors", "author-list", authorTemplate);
    fetchAndRender("customers", "customer-list", customerTemplate);
    fetchAndRender("orders", "order-list", orderTemplate);
    fetchAndRender("payments", "payment-list", paymentTemplate);
    fetchAndRender("employees", "employee-list", employeeTemplate);
    fetchAndRender("suppliers", "supplier-list", supplierTemplate);
});

const API_BASE_URL = "http://localhost:5000"; // TODO: Update to your Render URL for production

function fetchAndRender(endpoint, listId, templateFn) {
    const list = document.getElementById(listId);
    list.innerHTML = '<div class="loader">Loading...</div>';

    fetch(`${API_BASE_URL}/${endpoint}`)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            if (!data.length) {
                list.innerHTML = `<p class="empty-msg">No ${endpoint} available.</p>`;
                return;
            }

            data.forEach(item => {
                const div = document.createElement("div");
                div.className = "data-card animated";
                div.innerHTML = templateFn(item);
                list.appendChild(div);
            });
        })
        .catch(err => {
            list.innerHTML = `<p class="error-msg">Failed to load ${endpoint}</p>`;
            showToast(`Failed to fetch ${endpoint}`, "error");
            console.error(err);
        });
}

// Templates for Each Section
const bookTemplate = book => `
    <h3>${book.name || "Untitled"}</h3>
    <p><strong>ISBN:</strong> ${book.isbn || "N/A"}</p>
    <p><strong>Price:</strong> ₹${book.price || "N/A"}</p>
    <p><strong>Genre:</strong> ${book.genre || "N/A"}</p>
    <p><strong>Supplier:</strong> ${book.supplier_id?.name || "N/A"}</p>
`;

const authorTemplate = author => `
    <h3>${author.name || "Unknown"}</h3>
    <p><strong>DOB:</strong> ${author.dob ? new Date(author.dob).toDateString() : "N/A"}</p>
    <p><strong>Nationality:</strong> ${author.nationality || "Unknown"}</p>
`;

const customerTemplate = customer => `
    <h3>${customer.name || "Unknown"}</h3>
    <p><strong>Contact:</strong> ${customer.contact || "N/A"}</p>
    <p><strong>Address:</strong> ${customer.address || "N/A"}</p>
`;

const orderTemplate = order => `
    <h3>Order #${order.id}</h3>
    <p><strong>Customer:</strong> ${order.customer_name || "Unknown"}</p>
    <p><strong>Date:</strong> ${order.date ? new Date(order.date).toDateString() : "N/A"}</p>
    <p><strong>Total:</strong> ₹${order.total || "N/A"}</p>
`;

const paymentTemplate = payment => `
    <h3>Payment ID: ${payment.id}</h3>
    <p><strong>Amount:</strong> ₹${payment.amount || "N/A"}</p>
    <p><strong>Method:</strong> ${payment.method || "N/A"}</p>
`;

const employeeTemplate = emp => `
    <h3>${emp.name || "Unknown"}</h3>
    <p><strong>Position:</strong> ${emp.position || "Unknown"}</p>
    <p><strong>Contact:</strong> ${emp.contact || "N/A"}</p>
`;

const supplierTemplate = supplier => `
    <h3>${supplier.name || "Unknown"}</h3>
    <p><strong>Contact:</strong> ${supplier.contact || "N/A"}</p>
    <p><strong>Address:</strong> ${supplier.address || "N/A"}</p>
`;

// Search Utilities
function createSearchHandler(endpoint, inputId, listId, templateFn) {
    return function () {
        const query = document.getElementById(inputId).value.toLowerCase();
        fetch(`${API_BASE_URL}/${endpoint}`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(item => JSON.stringify(item).toLowerCase().includes(query));
                const list = document.getElementById(listId);
                list.innerHTML = "";

                if (!filtered.length) {
                    list.innerHTML = `<p class="empty-msg">No match found.</p>`;
                    return;
                }

                filtered.forEach(item => {
                    const div = document.createElement("div");
                    div.className = "data-card animated";
                    div.innerHTML = templateFn(item);
                    list.appendChild(div);
                });
            });
    };
}

window.searchBooks = createSearchHandler("books", "search-books", "book-list", bookTemplate);
window.searchAuthors = createSearchHandler("authors", "search-authors", "author-list", authorTemplate);
window.searchCustomers = createSearchHandler("customers", "search-customers", "customer-list", customerTemplate);
window.searchOrders = createSearchHandler("orders", "search-orders", "order-list", orderTemplate);
window.searchPayments = createSearchHandler("payments", "search-payments", "payment-list", paymentTemplate);
window.searchEmployees = createSearchHandler("employees", "search-employees", "employee-list", employeeTemplate);
window.searchSuppliers = createSearchHandler("suppliers", "search-suppliers", "supplier-list", supplierTemplate);

// Toast Notification
function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Logout Function
function logout() {
    showToast("You have been logged out!", "success");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}
const updateBackground = () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1920&q=80')";
    } else {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')";
    }
};

toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', toggleSwitch.checked ? 'dark' : 'light');
    updateBackground();
});

window.addEventListener('load', updateBackground);
