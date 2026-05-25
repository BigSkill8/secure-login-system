
const otpForm = document.getElementById("otpForm");
const message = document.getElementById("message");

const email = localStorage.getItem("userEmail");

// VERIFY OTP
otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otp = document.getElementById("otp").value;

    message.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch(
            "https://YOUR-BACKEND-URL/api/auth/verify-otp",
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

            // REDIRECT FIXED
            setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 1500);

        } else {
            message.innerHTML = `<span class="error">${data.message}</span>`;
        }

    } catch (error) {
        console.log(error);
        message.innerHTML = `<span class="error">Backend connection failed</span>`;
    }
});


// DARK / LIGHT MODE (FIXED SAFE)
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });
}
