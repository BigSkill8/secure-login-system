const API_BASE = "https://secure-login-system-pp91.onrender.com/api/auth";

const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

// REGISTER FORM
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.innerText = "Registering...";

    try {
        const response = await fetch(
    `${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        message.innerText = data.message;

        if (response.ok) {
            // store email for OTP step
            localStorage.setItem("userEmail", email);

            setTimeout(() => {
                window.location.href = "./verify-otp.html";
            }, 1500);
        }

    } catch (error) {
        console.log(error);
        message.innerText = "Server connection failed";
    }
});


// SHOW PASSWORD (SAFE FIX)
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
        password.type = password.type === "password"
            ? "text"
            : "password";
    });
}


// THEME TOGGLE (SAFE FIX)
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });
}
