document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === email);

        if (!user) {
            alert("User not found! Proceed to sign up.");
            window.location.href = "register.html";
            return;
        }

        if (user.password !== password) {
            alert("Incorrect password!");
            return;
        }

        user.isLoggedIn = true;

       
        localStorage.setItem("users", JSON.stringify(users));

        
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert(`Welcome, ${user.fullName}!`);
        window.location.href = "index.html";
    });
});
