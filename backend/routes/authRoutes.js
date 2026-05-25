const express = require("express");

const router = express.Router();

const {

    registerUser,

    verifyOTP,

    loginUser

} = require("../controllers/authController");


// REGISTER ROUTE

router.post("/register", registerUser);


// VERIFY OTP ROUTE

router.post("/verify-otp", verifyOTP);


// LOGIN ROUTE

router.post("/login", loginUser);


module.exports = router;