// ===================== OTP FORM =====================
const otpForm = document.getElementById("otpForm");
const message = document.getElementById("message");

// FIX: safe email retrieval
const email = localStorage.getItem("userEmail");

otpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otp = document.getElementById("otp").value;

    message.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch(
            "https://secure-login-system-pp91.onrender.com/api/auth/verify-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            message.innerHTML = `<span class="success">${data.message}</span>`;

            // FIXED FLOW → GO TO LOGIN FIRST OR DASHBOARD (choose login for safety)
            setTimeout(() => {
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


// ===================== THEME FIX =====================
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // optional persistence
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark-mode") ? "dark" : "light"
        );
    });
}

// APPLY SAVED THEME
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});
