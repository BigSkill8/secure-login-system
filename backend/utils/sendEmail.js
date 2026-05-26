const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Email credentials missing in environment variables");
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // verify connection (VERY IMPORTANT for Render debugging)
        await transporter.verify();

        const mailOptions = {
            from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log("Response:", info.response);

        return info;

    } catch (error) {
        console.log("❌ EMAIL ERROR:");
        console.log(error.message);

        throw error;
    }
};

module.exports = sendEmail;
