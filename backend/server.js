require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ IMPORTANT: use Render PORT safely
const PORT = process.env.PORT || 5000;


// ==============================
// DATABASE CONNECTION
// ==============================
connectDB();


// ==============================
// MIDDLEWARE
// ==============================

// FIX 1: safer CORS for frontend + production
app.use(cors({
    origin: "*", // you can lock this later to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());


// ==============================
// ROUTES
// ==============================
app.use("/api/auth", authRoutes);


// ==============================
// HEALTH CHECK ROUTE
// ==============================
app.get("/", (req, res) => {
    res.status(200).json({
        message: "SecureAuth Backend Running ✅",
        status: "OK"
    });
});


// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
