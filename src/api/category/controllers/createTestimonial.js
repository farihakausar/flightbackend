const { Testimoinal } = require("../../../models/Testimoinal");
const { leaveTestimonial } = require("../../../models/leaveTestimonialModel");

const createTestimonial = async (req, res) => {
  const { userId } = req.params; // Extract the userId from request parameters
  const { email, name, title, message, rating } = req.body; // Extract testimonial details from request body

  // Check if all required fields are provided
  if (!email || !name || !title || !message || !rating) {
    return res.status(400).json({
      message:
        "Please provide all required fields: email, name, title, message, and rating.",
    });
  }

  try {
    // Create a new leaveTestimonial document
    const newLeaveTestimonial = new leaveTestimonial({
      email,
      name,
      title,
      message,
      rating,
    });

    // Save the leaveTestimonial document in the database
    await newLeaveTestimonial.save();

    // Find the testimonial document for the user
    let testimonial = await Testimoinal.findOne({ user: userId });

    // If no testimonial document exists for the user, create a new one
    if (!testimonial) {
      testimonial = new Testimoinal({
        user: userId,
      });
    }

    // Add the reference of the new leaveTestimonial to the testimonial document
    testimonial.testimonials = testimonial.testimonials || [];
    testimonial.testimonials.push(newLeaveTestimonial._id);

    // Save the updated testimonial document
    await testimonial.save();

    res.status(201).json({
      message: "Testimonial added successfully!",
      testimonial,
      leaveTestimonial: newLeaveTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add the testimonial. Please try again.",
      error,
    });
  }
};

module.exports = {
  createTestimonial,
};
