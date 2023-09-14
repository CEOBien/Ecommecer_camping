const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.hash = async (element) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(element, salt);
  return hashPassword;
};
