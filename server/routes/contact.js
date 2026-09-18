const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// POST /api/contact
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields.",
            });
        }

        // Save message to MongoDB
        const contact = await Contact.create({
            name,
            email,
            message,
        });

        // Send email to you
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO,

            replyTo: email,

            subject: `New Portfolio Message from ${name}`,

            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>New Portfolio Contact</h2>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <div style="
                        padding: 15px;
                        background: #f5f5f5;
                        border-radius: 8px;
                    ">
                        ${message}
                    </div>

                    <p style="margin-top: 20px;">
                        This message was sent from your portfolio website.
                    </p>
                </div>
            `,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully!",
        });

    } catch (error) {
        console.error("Contact Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to send message. Please try again.",
        });
    }
});

module.exports = router;