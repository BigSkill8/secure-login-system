const loginForm =
document.getElementById("loginForm");

const message =
document.getElementById("message");


// LOGIN FORM

loginForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        // SHOW LOADER

        message.innerHTML =
        `<div class="loader"></div>`;

        try {

            const response = await fetch(

                "http://localhost:5000/api/auth/login",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        email,

                        password

                    })

                }

            );

            const data =
            await response.json();

            // SUCCESS

            if (response.ok) {

                message.innerHTML =
                `<span class="success">
                    Login Successful
                </span>`;

                // SAVE JWT TOKEN

                localStorage.setItem(
                    "token",
                    data.token
                );

                // SAVE USER

                localStorage.setItem(
                    "username",
                    data.user.username
                );

                localStorage.setItem(
                    "email",
                    data.user.email
                );

                // REDIRECT

                setTimeout(() => {

                    window.location.href =
                    "dashboard.html";

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
                Login failed
            </span>`;

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


// DARK / LIGHT MODE (FIXED)
const themeBtn = document.getElementById("themeBtn");

// optional safety check
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // save theme
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});
