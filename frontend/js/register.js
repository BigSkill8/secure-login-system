const registerForm =
document.getElementById("registerForm");

const message =
document.getElementById("message");


// REGISTER FORM

registerForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const username =
        document.getElementById("username").value;

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        try {

            const response = await fetch(

                "http://localhost:5000/api/auth/register",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        username,

                        email,

                        password

                    })

                }

            );

            const data =
            await response.json();

            message.innerText =
            data.message;

            if (response.ok) {

                localStorage.setItem(
                    "userEmail",
                    email
                );

                setTimeout(() => {

                    window.location.href =
                    "verify-otp.html";

                }, 2000);

            }

        } catch (error) {

            console.log(error);

            message.innerText =
            "Backend connection failed";

        }

    }
);


// SHOW PASSWORD

const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

togglePassword.addEventListener(
    "click",
    () => {

        if (password.type === "password") {

            password.type = "text";

        } else {

            password.type = "password";

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