const nodemailer = require("nodemailer");
const dns = require("dns");

// Force IPv4 (Render fix)
dns.setDefaultResultOrder("ipv4first");

const sendEmail = async (to, subject, text) => {
    try {

        console.log("🔥 SEND EMAIL FUNCTION CALLED");

        // CHECK ENV
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing EMAIL credentials");
        }

        // CREATE TRANSPORTER
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            family: 4, // force IPv4

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // EMAIL DATA
        const mailOptions = {
            from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

        // SEND EMAIL
        const info = await transporter.sendMail(mailOptions);

        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log("Response:", info.response);

        return info;

    } catch (error) {

        console.log("❌ EMAIL SENDING FAILED");
        console.log("Reason:", error.message);

        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
