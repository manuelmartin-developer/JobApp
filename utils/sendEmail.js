const nodemailer = require("nodemailer");
require('dotenv').config()

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_NODEMAILER,
                pass: process.env.PASS_NODEMAILER,
            },
        });

        await transporter.sendMail({
            from: process.env.PASS_NODEMAILER,
            to: email,
            subject: subject,
            text: text
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;