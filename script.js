document.addEventListener("DOMContentLoaded", function () {
    const username = document.querySelector(".username");
    const password = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");
    const usernameError = document.querySelector(".usernameError");
    const passwordError = document.querySelector(".passwordError");
    let loggersData = JSON.parse(localStorage.getItem("loggersData")) || [];
    const invalidError = document.querySelector(".invalidError");




    loginButton.addEventListener("click", function () {
        const usernameValue = username.value.trim();
        const passwordValue = password.value.trim();
        if (usernameValue === "") {
            usernameError.style.display = "block";
            usernameError.textContent = "Please enter your username.";
            username.style.border = "1px solid red";
            username.focus(); // Set focus on username input

            if (passwordValue === "") {
                passwordError.style.display = "block";
                passwordError.textContent = "Please enter your password.";
                password.style.border = "1px solid red";
                password.focus(); // Set focus on password input

            }
        } else {
            usernameError.style.display = "none";
            passwordError.style.display = "none";

            let userFound = loggersData.find(user => user.username === usernameValue && user.password === passwordValue);

            if (userFound) {
                window.location.href = `indexM.html?username=${username.value}`; // Redirect to indexM.html with username as a query parameter

            } else {
                invalidError.style.display = "block";
                invalidError.textContent = "Invalid username or password.";
                username.style.border = "1px solid red";
                password.style.border = "1px solid red";
                username.value = ""; // Clear the input field
                password.value = ""; // Clear the input field
                setTimeout(() => {
                    invalidError.style.display = "none";
                }, 3000); // Hide error message after 3 seconds

            }
        }
    });
    username.addEventListener("click", function () {
        usernameError.style.display = "none";
        username.style.border = "1px solid #ccc"; // Reset border color
    });
    password.addEventListener("click", function () {
        passwordError.style.display = "none";
        password.style.border = "1px solid #ccc"; // Reset border color
    });
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark");
    }
    else {
        document.body.classList.remove("dark");
    }

});