
// ===================== LOGIN FORM =====================
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch(
            "https://secure-login-system-pp91.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        );

        const data = await response.json();

        if (response.ok) {
            message.innerHTML = `<span class="success">Login Successful</span>`;

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("email", data.user.email);

            setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 1200);

        } else {
            message.innerHTML = `<span class="error">${data.message}</span>`;
        }

    } catch (error) {
        console.log(error);
        message.innerHTML = `<span class="error">Login failed</span>`;
    }
});


// ===================== SHOW PASSWORD =====================
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
        password.type = password.type === "password" ? "text" : "password";
    });
}


// ===================== DARK / LIGHT MODE =====================
const themeBtn = document.getElementById("themeBtn");

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }
});

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
}
