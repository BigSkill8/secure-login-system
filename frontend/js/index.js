const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// LOGIN FORM
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

            // SAVE JWT TOKEN
            localStorage.setItem("token", data.token);

            // SAVE USER
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("email", data.user.email);

            // REDIRECT
            setTimeout(() => {
                window.location.href = "./dashboard.html";
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

if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
        password.type = password.type === "password"
            ? "text"
            : "password";
    });
}
