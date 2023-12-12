const createError = require("http-errors");
const {
  registerUserValidate,
  changePasswordValidate,
  gameCardValidate,
  menuValidate,
  categoryValidate,
  profileValidate,
  addressUserValidate,
  blogValidate,
  commentBlogValidate,
  productValidate,
  discountTypeValidate,
  discountValidate,
} = require("../validations/validation");

module.exports.validDiscount = (req, res, next) => {
  const { error } = discountValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validDiscountType = (req, res, next) => {
  const { error } = discountTypeValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validProduct = (req, res, next) => {
  const filename = req.file;
  const IMAGE_PATH = filename?.path;
  const CLOUDY_IMAGE_ID = filename?.filename;
  const { NAME, PRICE, STOCK } = req.body;
  const { error } = productValidate({
    IMAGE_PATH,
    CLOUDY_IMAGE_ID,
    NAME,
    PRICE,
    STOCK,
  });
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validCommentBlog = (req, res, next) => {
  const { error } = commentBlogValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validAddressUser = (req, res, next) => {
  const { error } = addressUserValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validBlog = (req, res, next) => {
  const filename = req.file;
  const IMAGE_PATH = filename?.path;
  const CLOUDY_IMAGE_ID = filename?.filename;
  const { TITLE, DESC } = req.body;
  const { error } = blogValidate({ IMAGE_PATH, CLOUDY_IMAGE_ID, TITLE, DESC });
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validProfile = (req, res, next) => {
  const filename = req.file;
  const IMAGE_PATH = filename?.path;
  const CLOUDY_IMAGE_ID = filename?.filename;
  const { FIRST_NAME, LAST_NAME, PHONE_NUMBER, HOMETOWN } = req.body;
  const { error } = profileValidate({
    FIRST_NAME,
    LAST_NAME,
    PHONE_NUMBER,
    HOMETOWN,
    CLOUDY_IMAGE_ID,
    IMAGE_PATH,
  });
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validMenu = (req, res, next) => {
  const { error } = menuValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validCategory = (req, res, next) => {
  const { error } = categoryValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.validGameCard = (req, res, next) => {
  const filename = req.file;
  const IMAGE_PATH = filename?.path;
  const CLOUDY_IMAGE_ID = filename?.filename;
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
