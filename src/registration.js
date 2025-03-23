document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("regForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
  
        const fullName = document.getElementById("fullName").value.trim();
        const age = document.getElementById("age").value.trim();
        const gender = document.getElementById("gender").value;
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value.trim();
  
        if (!fullName || !age || !gender || !email || !password) {
          alert("All fields are required!");
          return;
        }
  
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        if (users.some((user) => user.email === email)) {
          alert("Email already exists! Please login.");
          return;
        }
  
        
        let user = { fullName, age, gender, email, password };
  
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Registration Successful!");
        window.location.href = "login.html";
      });
  });
  