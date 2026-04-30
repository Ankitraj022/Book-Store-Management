document.addEventListener("DOMContentLoaded", function () {
    // Signup Form Handling
    document.getElementById("signup-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("new-username").value.trim();
        let password = document.getElementById("new-password").value.trim();
        let confirmPassword = document.getElementById("confirm-password").value.trim();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Check if user already exists
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let existingUser = users.find(user => user.username === username);

        if (existingUser) {
            alert("Username already taken. Try another one.");
            return;
        }

        // Save new user
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully! You can now log in.");
        document.getElementById("signup-form").reset();
    });

    // Login Form Handling
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("login-username").value.trim();
        let password = document.getElementById("login-password").value.trim();

        // Fetch stored users
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            alert("Login Successful!");
            window.location.href = "index.html"; // Redirect after login
        } else {
            alert("Invalid Username or Password!");
        }
    });
});
