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
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // ==============================
        // REMOVE verify() FOR RENDER STABILITY
        // ==============================
        // FIX: verify() sometimes breaks cold starts on Render
        // await transporter.verify();

        // ==============================
        // EMAIL OPTIONS
        // ==============================
        const mailOptions = {
            from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

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
