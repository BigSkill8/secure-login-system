const emailjs = require("@emailjs/nodejs");

// EMAILJS CONFIG
const SERVICE_ID = "service_etryfes";
const TEMPLATE_ID = "template_chzqpol";
const PUBLIC_KEY = "v-2v76AUeztXzwke_";

// PRIVATE KEY FROM RENDER ENV
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

const sendEmail = async (to, otp) => {

    try {

        console.log("🔥 EMAILJS OTP FUNCTION CALLED");

        // SAFETY CHECK
        if (!PRIVATE_KEY) {
            throw new Error("Missing EMAILJS_PRIVATE_KEY");
        }

        // SEND EMAIL
        const response = await emailjs.send(

            SERVICE_ID,

            TEMPLATE_ID,

            {
                to_email: to,
                otp: otp
            },

            {
                publicKey: PUBLIC_KEY,
                privateKey: PRIVATE_KEY
            }

        );

        console.log("✅ EMAIL SENT SUCCESSFULLY");
        console.log("Response Status:", response.status);

        return response;

    } catch (error) {

        console.log("❌ EMAILJS ERROR");

        console.log(
            error?.message ||
            error?.text ||
            error
        );

        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
