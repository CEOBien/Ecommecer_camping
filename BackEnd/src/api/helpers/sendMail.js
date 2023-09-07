"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports.sendOtpToMail = async ({ EMAIL, OTP }) => {
    
  const transporter =  nodemailer.createTransport({
    service: "gmail",
    port:465,
    secure: false,
    auth: {
      user: process.env.ACCOUNT_GOOGLE, // generated ethereal user
      pass: process.env.PASSWORD_2FA, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: process.env.ACCOUNT_GOOGLE, // sender address
    to: EMAIL, // list of receivers
    subject: "Send Otp confirm your info", // Subject line
    text:
      "Dear Mate,  " +
      "\nHere is your otp code : " +
      OTP +
      "\nThank you for register account in web us. Have a nice day!" +
      "\nIf you have any questions, please contact us at the email below:" +
      "\ndxhai.20it11@vku.udn.vn \ndaohai271@gmail.com", // plain text body
  });
  return 1;
};
