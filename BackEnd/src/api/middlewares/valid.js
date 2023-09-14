const createError = require("http-errors");
const { 
  registerUserValidate,
  changePasswordValidate,
} = require("../validations/validation");

module.exports.validChangePassword = (req, res, next) => {
  const { error } = changePasswordValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validAuth = (req, res, next) => {
  const { error } = registerUserValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
