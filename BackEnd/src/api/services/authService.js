const createError = require("http-errors");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const db = require("../models");
const bcrypt = require("bcrypt");
const OTPgenerator = require("otp-generator");
const otpService = require("./otpService");
const { sendOtpToMail } = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const authService = {
  verifyOtp: async ({ EMAIL, OTP }) => {
    return new Promise(async (resolve, reject) => {
      try {
        //get list otp exist
        const otpHolder = await db.Otps.findAll({
          where: {
            IS_DELETED: false,
            EMAIL: EMAIL,
            expiration_time: {
              [db.Sequelize.Op.gt]: new Date(),
            },
          },
          raw: true,
        });
        //check if otpHolder exist or not
        if (!otpHolder.length) throw createError.NotFound("Expried OTP");
        //get last otp
        const lastOtp = otpHolder[otpHolder.length - 1];
        const isValid = await otpService.validOtp({
          OTP,
          hashOtp: lastOtp.OTP,
        });
        //check code if exist or not
        if (!isValid) throw createError.NotFound("Invalid OTP");

        if (isValid && EMAIL === lastOtp.EMAIL) {
          //random pasword
          const randomPassword = Math.floor(Math.random() * 999999) + 100000;
          //hash password
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(
            randomPassword.toString(),
            salt
          );
          //create account user
          const user = await db.Users.create({ EMAIL, PASSWORD: hashPassword });

          if (user) {
            await db.Otps.destroy({
              where: {
                EMAIL: EMAIL,
                IS_DELETED: false,
              },
            });

            resolve({
              status: user ? 201 : 400,
              message: user
                ? "Register account successfully"
                : "Error while register account",
              elements: randomPassword,
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  registerUser: async ({ EMAIL }) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if email exist or not
        const isEmail = await db.Users.findOne({
          where: {
            EMAIL: EMAIL,
            IS_DELETED: false,
          },
        });
        //check if code exist or not
        if (isEmail)
          throw createError.Conflict(`${EMAIL} is ready been register`);
        const OTP = OTPgenerator.generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        //send mail to email register
        await sendOtpToMail({ EMAIL, OTP });

        resolve({
          status: 200,
          message: "Please check your email or spam email",
          elements: await otpService.insertOtp({ EMAIL, OTP }),
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  login: async ({ EMAIL, PASSWORD }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Users.findOne({
          where: {
            EMAIL: EMAIL,
            IS_DELETED: false,
          },
        });
        //check code if exist or not
        if (!exist) throw createError.NotFound("Email not register");
        const isPassword = await bcrypt.compare(PASSWORD, exist.PASSWORD);
        //if password incorrect then show error
        if (!isPassword) throw createError.Unauthorized();
        //create accessToken
        const accessToken = await authService.generateAccessToken(exist.id);
        resolve({
          status: 200,
          message: "Login successfully",
          elements: accessToken,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  generateAccessToken: (userId) => {
    return new Promise(async (resolve, reject) => {
      const payload = {
        userId: userId,
      };
      const secret = process.env.KEY_SECRET;
      const option = {
        expiresIn: "1h",
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};

module.exports = authService;
