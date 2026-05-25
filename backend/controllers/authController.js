const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateOTP = require("../utils/generateOTP");

const sendEmail = require("../utils/sendEmail");


// ======================================
// REGISTER USER
// ======================================

const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // VALIDATION

        if (!username || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        // CHECK EXISTING USER

        const existingUser =
        await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        // HASH PASSWORD

        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
        await bcrypt.hash(password, salt);

        // GENERATE OTP

        const otp = generateOTP();

        // OTP EXPIRES IN 5 MINUTES

        const otpExpires =
        new Date(Date.now() + 5 * 60 * 1000);

        // CREATE USER

        const user = new User({

            username,

            email,

            password: hashedPassword,

            otp,

            otpExpires

        });

        // SAVE USER

        await user.save();

        // SEND OTP EMAIL

        await sendEmail(

            email,

            "SecureAuth OTP Verification",

            `Your OTP Code is: ${otp}`

        );

        // RESPONSE

        return res.status(201).json({

            message:
            "User registered. OTP sent to email."

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

};


// ======================================
// VERIFY OTP
// ======================================

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        // VALIDATION

        if (!email || !otp) {

            return res.status(400).json({
                message: "Email and OTP are required"
            });

        }

        // FIND USER

        const user =
        await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        // CHECK OTP

        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        // CHECK OTP EXPIRATION

        if (user.otpExpires < new Date()) {

            return res.status(400).json({
                message: "OTP expired"
            });

        }

        // VERIFY USER

        user.isVerified = true;

        // CLEAR OTP

        user.otp = null;

        user.otpExpires = null;

        // SAVE UPDATED USER

        await user.save();

        // SUCCESS RESPONSE

        return res.status(200).json({

            message:
            "Email verified successfully"

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

};


// ======================================
// LOGIN USER
// ======================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // VALIDATION

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password required"
            });

        }

        // FIND USER

        const user =
        await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email"
            });

        }

        // CHECK IF VERIFIED

        if (!user.isVerified) {

            return res.status(400).json({
                message:
                "Please verify your email first"
            });

        }

        // CHECK PASSWORD

        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        // CREATE JWT TOKEN

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );

        // SUCCESS RESPONSE

        return res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                username: user.username,

                email: user.email

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

};


module.exports = {

    registerUser,

    verifyOTP,

    loginUser

};