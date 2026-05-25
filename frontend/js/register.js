
// REGISTER FORM
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.innerText = "Registering...";

    try {
        const response = await fetch(
            "https://YOUR-BACKEND-URL/api/auth/register",
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

        message.innerText = data.message;

        if (response.ok) {
            localStorage.setItem("userEmail", email);

            setTimeout(() => {
                window.location.href = "./verify-otp.html";
            }, 1500);
        }

    } catch (error) {
        console.log(error);
        message.innerText = "Backend connection failed";
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


// DARK / LIGHT MODE
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });
}
