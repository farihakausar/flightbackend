const mongoose = require("mongoose");

const businessProfileSchema = new mongoose.Schema({
  businessName: {
    type: String,
  },
  type: {
    type: String,
  },
  primaryService: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  businessLogo: {
    type: String, // URL or image path
  },
  mainLocation: {
    address: {
      type: String,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  operation: {
    type: String,
    enum: ["Travel to customers", "Customer travels to us"],
  },
  description: {
    type: String,
  },
  profileSubtitle: {
    type: String,
  },
  youtubeVideo: {
    type: String, // URL for YouTube video
  },
  timeAvailable: {
    type: String,
    enum: ["24/7", "Specific Hours"],
  },
  approachCustomers: {
    type: String,
    enum: ["Proactive", "Reactive"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    // The user who adds this business profile
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending", // Default status when the business profile is added
  },
  stock: [
    {
      title: String,
      category: String,
      subcategory: String,
      price: Number,
      additionalService: {
        phone: String,
        website: String,
        email: String,
      },
      itemCondition: {
        type: String,
        enum: ["New", "Used", "Refurbished"],
      },
      description: String,
      color: String,
      deliveryMethod: {
        type: String,
        enum: ["Courier", "In-Person Pickup"],
      },
      tags: [String],
      photos: [String], // Array of image URLs
      videos: [String], // Array of video URLs
      referenceNumber: String,
      location: {
        address: String,
        coordinates: {
          type: { type: String, default: "Point" },
          coordinates: [Number], // [longitude, latitude]
        },
      },
      contactPreference: {
        salesPersonName: {
          type: String,
        },
        preference: {
          type: String,
          enum: ["Chat", "Call"],
        },
        phoneNumber: {
          type: String,
          required: function () {
            return this.preference === "Call";
          }, // Phone number is required if preference is "Call"
        },
      },
      rateAndCharges: {
        type: String,
        enum: ["Fixed", "Negotiable"],
      },
      insurance: {
        type: Boolean,
        default: false,
      },
      qualification: {
        type: String, // Details of qualifications if applicable
      },
    },
  ],
  paymentMethodsAccepted: {
    type: [String], // Array of accepted payment methods
    enum: ["Cash", "Credit Card", "Debit Card", "PayPal", "Bank Transfer"],
  },
});

const businessProfile = mongoose.model(
  "businessProfile",
  businessProfileSchema
);

module.exports = {
  businessProfile,
};
