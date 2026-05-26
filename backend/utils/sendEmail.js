const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {

        // ==============================
        // ENV CHECK
        // ==============================
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing EMAIL_USER or EMAIL_PASS in environment variables");
        }

        // ==============================
        // TRANSPORTER
        // ==============================
        const nodemailer = require("nodemailer");
const dns = require("dns");

// FORCE IPv4 (IMPORTANT FIX FOR RENDER)
dns.setDefaultResultOrder("ipv4first");

const sendEmail = async (to, subject, text) => {
    try {

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing EMAIL credentials");
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,

            // 🔥 FORCE IPv4 connection
            family: 4,

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log(info.response);

        return info;

    } catch (error) {
        console.log("❌ EMAIL FAILED");
        console.log(error.message);

        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;

        // ==============================
        // SEND EMAIL
        // ==============================
        const info = await transporter.sendMail(mailOptions);

        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log("Message ID:", info.messageId);

        return info;

    } catch (error) {

        console.log("❌ EMAIL SENDING FAILED");
        console.log("Reason:", error.message);

        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
