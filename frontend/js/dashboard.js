const token =
localStorage.getItem("token");


// PROTECT ROUTE

if (!token) {

    window.location.href =
    "login.html";

}


// USER DATA

const username =
localStorage.getItem("username");

const email =
localStorage.getItem("email");


// DISPLAY USER DATA

document.getElementById(
    "username"
).innerText = username;

document.getElementById(
    "email"
).innerText = email;


// LOGOUT

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.clear();

        window.location.href =
        "login.html";

    }
);


// DARK/LIGHT MODE

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-dashboard"
        );

    }
);
