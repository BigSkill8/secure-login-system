const API_BASE = "https://secure-login-system-pp91.onrender.com/api/auth";

const otpForm = document.getElementById("otpForm");
const message = document.getElementById("message");

// SAFE EMAIL CHECK
const email = localStorage.getItem("userEmail");

if (!email) {
    console.warn("No email found in localStorage (register step may be skipped)");
}

if (otpForm) {
    otpForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const otp = document.getElementById("otp").value;

        message.innerHTML = `<div class="loader"></div>`;

        try {
            const response = await fetch(
    `${API_BASE_URL}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            const data = await response.json();

            if (response.ok) {
                message.innerHTML = `<span class="success">${data.message}</span>`;

                setTimeout(() => {
                    // AFTER OTP → GO TO LOGIN
                    window.location.href = "./index.html";
                }, 1500);

            } else {
                message.innerHTML = `<span class="error">${data.message}</span>`;
            }

        } catch (error) {
            console.log(error);
            message.innerHTML = `<span class="error">Server not reachable</span>`;
        }
    });
}


// ===================== THEME (MATCH LOGIN STYLE) =====================
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

// APPLY SAVED THEME
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
});
