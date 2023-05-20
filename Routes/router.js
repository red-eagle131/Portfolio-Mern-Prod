const express = require("express");
const router = new express.Router();
const users = require("../models/userSchema");
const nodemailer = require("nodemailer");

// env file
const dotenv = require("dotenv");
dotenv.config();

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// register user details
router.post("/register", async (req, res) => {
  const { fname, lname, email, mobile, message } = req.body;

  if (!fname || !lname || !email || !mobile) {
    res.status(401).json({ status: 401, error: "All inputs are required" });
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      const userMessage = await preuser.Messagesave(message);
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank you for contacting us",
        text: "Your Response has been Submitted",
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
    } else {
      const finalUser = new users({
        fname,
        lname,
        email,
        mobile,
        messages: { message: message },
      });

      const storeData = await finalUser.save();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank you for contacting us",
        text: "Your Response has been Submitted",
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error: "All inputs are required" });
    console.log(error);
  }
});

module.exports = router;
