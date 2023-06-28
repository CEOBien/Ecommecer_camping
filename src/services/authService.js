import db from "../models";
import argon from "argon2";
import jwt from "jsonwebtoken";
require("dotenv").config();

//REGISTER

export const register = ({ name, email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await argon.hash(password);
      const responsive = await db.User.findOrCreate({
        where: { email },
        defaults: {
          name,
          email,
          password: hashPassword,
        },
      });

      const Token = responsive[1]
        ? jwt.sign(
            {
              userId: responsive[0].id,
              email: responsive[0].email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2d" }
          )
        : null;

      resolve({
        err: responsive[1] ? 0 : 1,
        mess: responsive[1]
          ? "Created accout successfully!"
          : "Email was exited!",
        access_token: `Bearer ${Token}`,
      });
    } catch (error) {
      reject(error);
    }
  });

//LOGIN

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      //check email is exited
      const responsive = await db.User.findOne({ where: { email }, raw: true });

      //check account
      const isChecked =
        responsive && (await argon.verify(responsive.password, password));

      const accessToken = isChecked
        ? jwt.sign(
            { userId: responsive.id, email: responsive.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2d" }
          )
        : null;

      resolve({
        err: accessToken ? 0 : 1,
        mess: accessToken
          ? "login is successfully!"
          : responsive
          ? "Password is wrong"
          : "Email not has been register",
        access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
      });
    } catch (error) {
      reject(error);
    }
  });
