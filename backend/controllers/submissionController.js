const Submission = require('../models/Submission');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// @desc    Create a new submission
// @route   POST /api/submit
// @access  Public
const createSubmission = async (req, res) => {
    try {
        const {
            companyName,
            founderName,
            businessEmail,
            website,
            industry,
            yearFounded,
            productDescription,
            targetAudience,
            pricingModel,
            monthlyUsers,
            revenueRange,
            customerAcquisitionChannels,
            supportEmail,
            responseTime
        } = req.body;

        // Validation - Basic required fields
        if (!companyName || !founderName || !businessEmail || !productDescription) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create submission
        const submission = await Submission.create({
            companyName,
            founderName,
            businessEmail,
            website,
            industry,
            yearFounded,
            productDescription,
            targetAudience,
            pricingModel,
            monthlyUsers,
            revenueRange,
            customerAcquisitionChannels,
            supportEmail,
            responseTime
        });

        // Optional: Send email notification
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // or your preferred service
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send to yourself
                subject: `New Startup Registration: ${companyName}`,
                text: `
                    Company: ${companyName}
                    Founder: ${founderName}
                    Email: ${businessEmail}
                    Website: ${website}
                    Industry: ${industry}
                    Description: ${productDescription}
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }

        res.status(201).json({
            success: true,
            data: submission,
            message: 'Submission received successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Public
const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ createdAt: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createSubmission,
    getSubmissions,
};
