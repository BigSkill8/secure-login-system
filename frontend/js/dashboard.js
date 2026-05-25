
// GET TOKEN
const token = localStorage.getItem("token");

// PROTECT ROUTE
if (!token) {
    window.location.href = "./index.html";
}

// USER DATA
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

// DISPLAY USER DATA (SAFE CHECKS)
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");

if (usernameEl) usernameEl.innerText = username || "User";
if (emailEl) emailEl.innerText = email || "";

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "./index.html";
    });
}


// DARK / LIGHT MODE
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });
}
