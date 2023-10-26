const createError = require("http-errors");
const {
  registerUserValidate,
  changePasswordValidate,
  gameCardValidate,
} = require("../validations/validation");

module.exports.validGameCard = (req, res, next) => {
  const IMAGE_PATH = req.file.path;
  const CLOUDY_IMAGE_ID = req.file.filename;
  const { CONTENT, TYPE_CARD } = req.body;
  const { error } = gameCardValidate({
    CONTENT,
    TYPE_CARD,
    CLOUDY_IMAGE_ID,
    IMAGE_PATH,
  });
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

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
