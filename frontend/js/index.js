
// LOGIN FORM
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // SHOW LOADER
    message.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch(
            "https://YOUR-BACKEND-URL/api/auth/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        // SUCCESS
        if (response.ok) {
            message.innerHTML = `<span class="success">Login Successful</span>`;

            // SAVE DATA
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("email", data.user.email);

            // REDIRECT
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);

        } else {
            message.innerHTML = `<span class="error">${data.message}</span>`;
        }

    } catch (error) {
        console.log(error);
        message.innerHTML = `<span class="error">Login failed</span>`;
    }
});


// SHOW PASSWORD
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
});


// DARK / LIGHT MODE (FIXED)
const themeBtn = document.getElementById("themeBtn");

// load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});
