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

        // BREVO TRANSPORTER (FIXED)
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // IMPORTANT for Brevo
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // VERIFY CONNECTION (IMPORTANT DEBUG STEP)
        await transporter.verify();
        console.log("✅ SMTP CONNECTION VERIFIED");

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
