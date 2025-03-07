const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

// Create a Nodemailer transporter with Gmail settings
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use another email service here
  auth: {
    user: "muazraja@gmail.com", 
    pass: "eylj ekku bupa ttfp",
  },
});

// Define the POST route to handle booking submissions
router.post("/booking", async (req, res) => {
  const { name, number, dateTime, totalPax, email } = req.body;

  // Email content for booking notification
  const mailOptions = {
    from: email, // The user's email is set as the "from" field
    to: "muazraja@gmail.com", // All bookings will be sent to this email address
    subject: "New Booking Request", // Email subject
    text: `
      You have received a new booking request:

      Name: ${name}
      Number: ${number}
      Date and Time: ${dateTime}
      Total PAX: ${totalPax}
      Customer Email: ${email} // This field will be included to track the user's email
    `, // Email body content with the booking details
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Booking submitted successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

module.exports = router;
