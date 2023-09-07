const createError = require("http-errors");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const db = require("../models");
const bcrypt = require("bcrypt");
const otpService = {
  validOtp: async ({ OTP, hashOtp }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const isValid = bcrypt.compare(OTP, hashOtp);
        resolve(isValid);
      } catch (error) {
        reject(error);
      }
    });
  },
  insertOtp: async ({ EMAIL, OTP }) => {
    return new Promise(async (resolve, reject) => {
      try {
        // thiết lập hết hạn otp sau bao nhiêu phút
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 10);
        //hash otp
        const salt = await bcrypt.genSalt(10);
        const hashOtp = await bcrypt.hash(OTP, salt);
        const Otp = await db.Otps.create({
          EMAIL: EMAIL,
          OTP: hashOtp,
          expiration_time: expirationTime,
        });

        resolve(Otp ? 1 : 0);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = otpService;
