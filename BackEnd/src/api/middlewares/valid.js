const createError = require("http-errors");
const { registerUserValidate } = require("../validations/validation");

module.exports.validAuth = (req, res, next) => {
  const { error } = registerUserValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
