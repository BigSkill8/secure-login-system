const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

// REGISTER FORM
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch(
            "https://secure-login-system-pp91.onrender.com/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            message.innerHTML = `<span class="success">${data.message}</span>`;

            // IMPORTANT: SAVE EMAIL FOR OTP STEP
            localStorage.setItem("userEmail", email);

            // go to OTP page
            setTimeout(() => {
                window.location.href = "./verify-otp.html";
            }, 1500);

        } else {
            message.innerHTML = `<span class="error">${data.message}</span>`;
        }

    } catch (error) {
        console.log(error);
        message.innerHTML = `<span class="error">Backend connection failed</span>`;
    }
});


// SHOW PASSWORD
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
        password.type = password.type === "password" ? "text" : "password";
    });
}
