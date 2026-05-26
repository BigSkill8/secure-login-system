const token = localStorage.getItem("token");

// PROTECT ROUTE
if (!token) {
    window.location.href = "./index.html";
}

// USER DATA
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

// SAFE ELEMENT CHECK (prevents null crashes)
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");

if (usernameEl) {
    usernameEl.innerText = username || "User";
}

if (emailEl) {
    emailEl.innerText = email || "No email found";
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();

        // always use relative path for Vercel
        window.location.href = "./index.html";
    });
}
