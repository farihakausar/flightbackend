const ContactUs = require("../../../models/ContactUs");
const nodemailer = require("nodemailer");

const contactUs = async (req, res) => {
  const { userEmail, userName, advertId, message } = req.body;

  // Validate input
  if (!userEmail || !userName || !advertId || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Create a new contact message
    const contactMessage = new ContactUs({
      userEmail,
      userName,
      advertId,
      message,
    });

    // Save the contact message to the database
    await contactMessage.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: "screenings@preferental.com",
        pass: "hfkn rqzn ngzq rhcp",
      },
    });
    //correct
    // const mailOptions = {
    //   from: userEmail,
    //   to: "screenings@preferental.com",
    //   subject: "New Contact Us Message",
    //   text: `You have received a new message from ${userName} (${userEmail}) regarding advert ${advertId}:\n\n${message}`,
    // };
    //for tempoetr puropsz dee
    const mailOptions = {
      from: "screenings@preferental.com",
      to: userEmail,
      subject: "New Contact Us Message",
      text: `You have received a new message from ${userName} (${userEmail}) regarding advert ${advertId}:\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending your message." });
  }
};

module.exports = {
  contactUs,
};
