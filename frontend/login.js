function login() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        alert("Login Successful!");
        window.location.href = "index.html"; // Redirect to bookstore page
    } else {
        alert("Invalid username or password.");
    }
}
