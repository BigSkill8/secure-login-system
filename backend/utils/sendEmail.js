const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // MUST be Gmail App Password
            }
        });

        const mailOptions = {
            from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ EMAIL SENT:", info.response);

        return info;

    } catch (error) {
        console.log("❌ EMAIL FAILED:");
        console.log(error.message);

        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
