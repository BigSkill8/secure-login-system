require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// CONNECT DATABASE

connectDB();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);


// HOME ROUTE

app.get("/", (req, res) => {

    res.send("SecureAuth Backend Running");

});


// START SERVER

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});