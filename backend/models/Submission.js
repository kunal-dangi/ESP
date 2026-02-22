const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, 'Please add company name'],
        },
        founderName: {
            type: String,
            required: [true, 'Please add founder name'],
        },
        businessEmail: {
            type: String,
            required: [true, 'Please add business email'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        website: {
            type: String,
            required: [false, 'Optional website'],
        },
        industry: {
            type: String,
            required: [true, 'Please add industry'],
        },
        yearFounded: {
            type: Number,
            required: [true, 'Please add year founded'],
        },
        productDescription: {
            type: String,
            required: [true, 'Please add product description'],
        },
        targetAudience: {
            type: String,
            required: [true, 'Please add target audience'],
        },
        pricingModel: {
            type: String,
            required: [true, 'Please add pricing model'],
        },
        monthlyUsers: {
            type: Number,
            required: [false],
        },
        revenueRange: {
            type: String,
            required: [false],
        },
        customerAcquisitionChannels: {
            type: String,
            required: [false],
        },
        supportEmail: {
            type: String,
            required: [false],
        },
        responseTime: {
            type: String,
            required: [false],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Submission', submissionSchema);
