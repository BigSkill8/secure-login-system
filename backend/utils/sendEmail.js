const emailjs = require("@emailjs/nodejs");

// EmailJS credentials
const SERVICE_ID = "service_etryfes";
const TEMPLATE_ID = "template_chzqpol";
const PUBLIC_KEY = "v-2v76AUeztXzwke_";

const sendEmail = async (to, otp) => {
    try {
        console.log("🔥 EMAILJS OTP FUNCTION CALLED");

        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                to_email: to,
                otp: otp
            },
            {
                publicKey: PUBLIC_KEY
            }
        );

        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log("Response Status:", response.status);

        return response;

    } catch (error) {
        console.log("❌ EMAILJS ERROR");
        console.log(error?.message || error);

        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
