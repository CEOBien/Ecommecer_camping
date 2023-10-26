const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
const client = require("../../config/redis");
module.exports.generateAccessToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      userId: userId,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const option = {
      expiresIn: "1d",
    };
    jwt.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports.resetToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      userId: userId,
    };
    const secret = process.env.RESET_TOKEN_SECRET;
    const option = {
      expiresIn: "1m",
    };
    jwt.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports.verifyAccessToken = async (req, res, next) => {
  
  if (!req.headers["authorization"]) return next(createError.Unauthorized);
  
  //get token
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[0];
  //start verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return next(createError.Unauthorized());
      }
      return next(createError.Unauthorized(err.message));
    }

    req.payload = payload;
    next();
  });
};

module.exports.signRefreshToken = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        userId: userId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const option = {
        expiresIn: "1y",
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        client.set(
          userId.toString(),
          token,
          "EX",
          365 * 24 * 60 * 60,
          (err, reply) => {
            if (err) return reject(createError.InternalServerError());
          }
        );
        resolve(token);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.verifyRefreshToken = async (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(err);
          client.get(payload.userId, (err, reply) => {
            if (err) {
              return reject(createError.InternalServerError());
            }
            if (refreshToken === reply) {
              resolve(payload);
            }
            return reject(createError.Unauthorized());
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
