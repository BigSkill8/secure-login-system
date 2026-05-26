const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");


// ==============================
// REGISTER USER (FIXED EMAILJS)
// ==============================
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
            isVerified: false
        });

        await user.save();

        // EMAILJS OTP SEND (FIXED)
        sendEmail(email, otp)
            .then(() => {
                console.log("OTP email sent successfully");
            })
            .catch((err) => {
                console.log("EMAIL ERROR:", err);
            });

        return res.status(201).json({
            message: "User registered. OTP sent to email."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// ==============================
// VERIFY OTP
// ==============================
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({ message: "OTP not generated" });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        if (String(user.otp).trim() !== String(otp).trim()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// ==============================
// LOGIN USER
// ==============================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

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
        return res.status(500).json({ message: "Server Error" });
    }
};


module.exports = {
    registerUser,
    verifyOTP,
    loginUser
};
