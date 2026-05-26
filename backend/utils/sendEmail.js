const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    try {

        console.log("🔥 RESEND EMAIL FUNCTION CALLED");

        if (!process.env.RESEND_API_KEY) {
            throw new Error("Missing RESEND_API_KEY");
        }

        const data = await resend.emails.send({
            from: "SecureAuth <onboarding@resend.dev>",
            to,
            subject,
            text
        });

        // 🔥 IMPORTANT DEBUG LOG (THIS IS WHAT WE NEED)
        console.log("📩 RESEND FULL RESPONSE:");
        console.log(JSON.stringify(data, null, 2));

        console.log("✅ EMAIL REQUEST ACCEPTED BY RESEND");

        return data;

    } catch (error) {

        console.log("❌ EMAIL FAILED");
        console.log("Reason:", error.message);

        throw error;
    }
};

module.exports = sendEmail;
