const createError = require("http-errors");
const {
  cityValidate,
  countryValidate,
  loginValidate,
} = require("../validations/validation");


module.exports.validLogin = (req, res, next) => {
  const { error } = loginValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
module.exports.validCity = async (req, res, next) => {
  const { error } = cityValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  next();
};
module.exports.validCountry = async (req, res, next) => {
  const { error } = countryValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  next();
};
