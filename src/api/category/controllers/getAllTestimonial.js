const { Testimoinal } = require("../../../models/Testimoinal");

const getAllTestimonial = async (req, res) => {
  try {
    const { date, rating } = req.query;

    // Build the filter object
    const filter = {};

    // Filter by date if provided
    if (date) {
      filter.date = new Date(date);
    }

    // Filter by rating if provided
    if (rating) {
      filter["testimonials.rating"] = parseFloat(rating);
    }

    // Find testimonials and populate the 'testimonials' field
    const testimonials = await Testimoinal.find(filter).populate(
      "testimonials"
    );

    res.status(200).json(testimonials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Oops! Something went wrong. Try again later.", error });
  }
};

module.exports = {
  getAllTestimonial,
};
