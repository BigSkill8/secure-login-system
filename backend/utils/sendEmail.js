const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    try {

        // CREATE TRANSPORTER

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,

                pass: process.env.EMAIL_PASS

            }

        });

        // EMAIL OPTIONS

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to,

            subject,

            text

        };

        // SEND EMAIL

        await transporter.sendMail(mailOptions);

        console.log("Email Sent Successfully");

    } catch (error) {

        console.log("Email Sending Error");

        console.log(error);

    }

};

module.exports = sendEmail;