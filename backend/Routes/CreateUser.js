const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const jwtSecret = process.env.JWT_SECRET;

const sendVerifyMail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "For verification mail",
      html: `<p>Hello ${name}, please click here to 
      <a href= "${process.env.BACKEND_URL}/api/verify?id=${user_id}">Verify</a> 
      your mail</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyMail = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: "1" } }
    );
    console.log(updateInfo);
    res.send("Email has been verified. You can now login to your account.");
  } catch (error) {
    console.log(error.message);
  }
};

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }).withMessage("Invalid Password"),
    body("role").isIn(["user", "vendor"]).withMessage("Invalid role"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "Invalid credentials" });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const userData = await User.create({
        "name": req.body.name,
        "password": secPassword,
        "email": req.body.email,
        "location": req.body.location,
        "role": req.body.role,
      });
      if (req.body.email.endsWith("@nitt.edu"))
        sendVerifyMail(userData.name, userData.email, userData._id);
      else throw errors;
      res.json({
        success: true,
        message: "Verification email has been sent. Please verify your email",
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Invalid credentials" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).withMessage("Invalid Password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let email = req.body.email;
    let role = req.body.role;
    try {
      let userData = await User.findOne({ email, role });
      if (!userData) {
        return res.status(400).json({ success: false, errors: "mail is incorrect" });
      }
      if (userData.is_verified === "0") {
        return res.status(400).json({ success: false, errors: "email not verified" });
      }
      if (req.body.role && req.body.role !== userData.role) {
        return res.status(400).json({ success: false, errors: "Role mismatch" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!pwdCompare) {
        return res.status(400).json({ success: false, errors: "password wrong" });
      }

      const data = {
        user: {
          id: userData.id,
          role: userData.role,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken, role: userData.role });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/getuser", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });
    res.status(200).json({ success: true, name: user.name });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
});

router.get("/verify", verifyMail);

module.exports = router;
