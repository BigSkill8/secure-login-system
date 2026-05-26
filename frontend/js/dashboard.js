document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // CHECK AUTH
    // ==============================
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "./index.html";
        return;
    }

    // ==============================
    // USER DATA
    // ==============================
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const usernameEl = document.getElementById("username");
    const emailEl = document.getElementById("email");

    if (usernameEl) {
        usernameEl.innerText = username || "User";
    }

    if (emailEl) {
        emailEl.innerText = email || "No email found";
    }

    // ==============================
    // LOGOUT
    // ==============================
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "./index.html";
        });
    }

    // ==============================
    // THEME
    // ==============================
    const themeBtn = document.getElementById("themeBtn");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-dashboard");
    }

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

});
