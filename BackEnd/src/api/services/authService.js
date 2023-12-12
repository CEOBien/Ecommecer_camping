const createError = require("http-errors");
const db = require("../models");
const bcrypt = require("bcrypt");
const OTPgenerator = require("otp-generator");
const otpService = require("./otpService");
const { sendOtpToMail, resetPassword } = require("../helpers/sendMail");
const client = require("../../config/redis");
const {
  generateAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  resetToken,
} = require("../middlewares/authenticate");
const { hash } = require("../middlewares/hash");
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
          const hashPassword = await hash(randomPassword.toString());
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
        const isPassword = await bcrypt.compare(PASSWORD,exist.PASSWORD);
        console.log(isPassword)
        //if password incorrect then show error
        if (!isPassword)
          throw createError.Unauthorized("Email or password incorrect");
        //create accessToken
        const accessToken = await generateAccessToken(exist.id);
        const refreshToken = await signRefreshToken(exist.id);
        resolve({
          status: 200,
          message: "Login successfully",
          elements: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  refreshToken: async ({ refreshToken }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = await verifyRefreshToken(refreshToken);
        const accessToken = await generateAccessToken(userId);
        const refrToken = await signRefreshToken(userId);
        resolve({
          status: 200,
          message: "Refresh token successfully",
          elements: {
            accessToken: accessToken,
            refreshToken: refrToken,
          },
        });
      } catch (error) {
        
        reject(error);
      }
    });
  },
  logout: async (refreshToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {userId} = await verifyRefreshToken(refreshToken);
        client.del(userId.toString(), (err, reply) => {
          if (err) throw createError.InternalServerError();

          resolve({
            status: 200,
            message: "Logout successfully",
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  changePassword: async (changePassword, accountId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { oldPassword, newPassword } = changePassword;
        //check account exist or not
        const account = await db.Users.findOne({
          where: {
            IS_DELETED: false,
            id: accountId,
          },
        });

        const verifyPassword = await bcrypt.compare(
          oldPassword,
          account.PASSWORD
        );
        if (!verifyPassword) throw createError.BadRequest("Password invalid");

        const hashPassword = await hash(newPassword);

        await db.Users.update(
          {
            PASSWORD: hashPassword,
          },
          {
            where: {
              IS_DELETED: false,
              id: accountId,
            },
          }
        );
        resolve({
          status: 200,
          message: "Change password successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  forgetPassword: async (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Users.findOne({
          where: {
            IS_DELETED: false,
            EMAIL: email,
          },
        });
        if (!exist) throw createError.NotFound("Your email not exist");
        const resetPasswordToken = await resetToken(exist.id);

        await resetPassword(email, resetPasswordToken);
        resolve({
          status: 200,
          message: "Please check your email or spam email",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  resetPassword: async (newPassword, token) => {
    return new Promise(async (resolve, reject) => {
      try {
        //decode token
        const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        if(!decoded)
          throw createError.Unauthorized(err.message);
        const userId = decoded.userId;
        //check if code exist or not
        const exist = await db.Users.findOne({
          where: {
            IS_DELETED: false,
            id: userId,
          },
        });
        if (!exist) throw createError.NotFound("Token expried");
        const hashPassword = await hash(newPassword);
        await db.Users.update(
          {
            PASSWORD: hashPassword,
          },
          {
            where: {
              IS_DELETED: false,
              id: userId,
            },
          }
        );
        resolve({
          status: 200,
          message: "Reset password successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = authService;
