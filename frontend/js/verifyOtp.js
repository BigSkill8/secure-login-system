const otpForm =
document.getElementById("otpForm");

const message =
document.getElementById("message");

const email =
localStorage.getItem("userEmail");


// VERIFY OTP

otpForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const otp =
        document.getElementById("otp").value;

        // SHOW LOADER

        message.innerHTML =
        `<div class="loader"></div>`;

        try {

            const response = await fetch(

                "http://localhost:5000/api/auth/verify-otp",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        email,

                        otp

                    })

                }

            );

            const data =
            await response.json();

            // SUCCESS

            if (response.ok) {

                message.innerHTML =
                `<span class="success">
                    ${data.message}
                </span>`;

                // REDIRECT

                setTimeout(() => {

                    window.location.href =
                    "login.html";

                }, 1500);

            }

            // ERROR

            else {

                message.innerHTML =
                `<span class="error">
                    ${data.message}
                </span>`;

            }

        } catch (error) {

            console.log(error);

            message.innerHTML =
            `<span class="error">
                Backend connection failed
            </span>`;

        }

    }
);


// DARK/LIGHT MODE

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

    }
);
