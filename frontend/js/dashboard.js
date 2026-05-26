const token = localStorage.getItem("token");

// PROTECT ROUTE
if (!token) {
    window.location.href = "./index.html";
}

// USER DATA (SAFE)
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

// DISPLAY USER DATA (SAFE CHECKS)
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");

if (usernameEl) {
    usernameEl.innerText = username || "User";
}

if (emailEl) {
    emailEl.innerText = email || "No email found";
}


// LOGOUT (SAFE)
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "./index.html";
    });
}


// ===================== THEME FIX (PERSISTENT) =====================
const themeBtn = document.getElementById("themeBtn");

// APPLY SAVED THEME
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-dashboard");
    }
});

// TOGGLE THEME
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-dashboard");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light-dashboard")
                ? "light"
                : "dark"
        );
    });
}
