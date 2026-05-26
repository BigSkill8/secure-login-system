const API_BASE = "https://secure-login-system-pp91.onrender.com/api/auth";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// LOGIN FORM
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        message.innerHTML = `<div class="loader"></div>`;

        try {
            const response = await fetch(
    `${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                message.innerHTML = `<span class="success">Login Successful</span>`;

                // SAVE DATA
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("email", data.user.email);

                // REDIRECT
                setTimeout(() => {
                    window.location.href = "./dashboard.html";
                }, 1200);

            } else {
                message.innerHTML = `<span class="error">${data.message}</span>`;
            }

        } catch (error) {
            console.log(error);
            message.innerHTML = `<span class="error">Server connection failed</span>`;
        }
    });
}


// SHOW PASSWORD
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
        password.type = password.type === "password"
            ? "text"
            : "password";
    });
}


// THEME TOGGLE (SAFE)
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light") ? "light" : "dark"
        );
    });
}

// APPLY THEME ON LOAD
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
});
