const Joi = require("joi");

const registerUserValidate = (data) => {
  const schema = Joi.object({
    EMAIL: Joi.string().email().required().label("EMAIL"),
    PASSWORD: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .label("PASSWORD"),
  });

  return schema.validate(data);
};
const changePasswordValidate = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required().min(6).max(30).label("oldPassword"),
    newPassword: Joi.string().required().min(6).max(30).label("newPassword"),
  });

  return schema.validate(data);
};
const gameCardValidate = (data) => {
  const schema = Joi.object({
    CONTENT: Joi.string().label("CONTENT"),
    TYPE_CARD: Joi.string().label("TYPE_CARD"),
    IMAGE_PATH: Joi.string().label("IMAGE_PATH"),
    CLOUDY_IMAGE_ID: Joi.string().label("CLOUDY_IMAGE_ID"),
  });

  return schema.validate(data);
};
const menuValidate = (data) => {
  const schema = Joi.object({
    TITLE: Joi.string().label("TITLE"),
    PARENT_ID: Joi.number().label("PARENT_ID"),
  });

  return schema.validate(data);
};
const categoryValidate = (data) => {
  const schema = Joi.object({
    TITLE: Joi.string().label("TITLE"),
    PARENT_ID: Joi.number().label("PARENT_ID"),
    CD: Joi.string().label("CD"),
  });

  return schema.validate(data);
};
const profileValidate = (data) => {
  const schema = Joi.object({
    FIRST_NAME: Joi.string().label("FIRST_NAME"),
    LAST_NAME: Joi.string().label("LAST_NAME"),
    IMAGE_PATH: Joi.string().label("IMAGE_PATH"),
    CLOUDY_IMAGE_ID: Joi.string().label("CLOUDY_IMAGE_ID"),
    HOMETOWN: Joi.string().label("HOMETOWN"),
    PHONE_NUMBER: Joi.number().label("PHONE_NUMBER"),
  });

  return schema.validate(data);
};

const addressUserValidate = (data) => {
  const schema = Joi.object({
    STREET_ADDRESS: Joi.string().label("STREET_ADDRESS"),
    CITY: Joi.string().label("CITY"),
    STATE: Joi.string().label("STATE"),
    ZIP_CODE: Joi.number().label("ZIP_CODE"),
    PROFILE_ID: Joi.number().label("PROFILE_ID"),
  });

  return schema.validate(data);
};
const blogValidate = (data) => {
  const schema = Joi.object({
    TITLE: Joi.string().label("TITLE"),
    DESC: Joi.string().label("DESC"),
    IMAGE_PATH: Joi.string().label("IMAGE_PATH"),
    CLOUDY_IMAGE_ID: Joi.string().label("CLOUDY_IMAGE_ID"),
    USER_ID: Joi.number().label("USER_ID"),
  });

  return schema.validate(data);
};
const commentBlogValidate = (data) => {
  const schema = Joi.object({
    CONTENT: Joi.string().label("CONTENT"),
    BLOG_ID: Joi.number().label("BLOG_ID"),
  });

  return schema.validate(data);
};
const productValidate = (data) => {
  const schema = Joi.object({
    NAME: Joi.string().label("NAME"),
    PRICE: Joi.number().label("PRICE"),
    STOCK: Joi.number().label("STOCK"),
    IMAGE_PATH: Joi.string().label("IMAGE_PATH"),
    CLOUDY_IMAGE_ID: Joi.string().label("CLOUDY_IMAGE_ID"),
  });

  return schema.validate(data);
};

const discountTypeValidate = (data) => {
  const schema = Joi.object({
    NAME: Joi.string().label("NAME"),
    VALUE: Joi.number().label("VALUE"),
  });

  return schema.validate(data);
};
const discountValidate = (data) => {
  const schema = Joi.object({
    CODE: Joi.string().label("CODE"),
    START_DATE: Joi.date().label("START_DATE").iso().min("now"),
    END_DATE: Joi.date().label("END_DATE").iso().greater(Joi.ref("START_DATE")),
    USAGE_LIMIT: Joi.number().label("USAGE_LIMIT").integer().min(1),
    DISCOUNT_TYPE_ID: Joi.number().label("DISCOUNT_TYPE_ID"),
    IS_ACTIVE: Joi.boolean().label("IS_ACTIVE"),
  });

  return schema.validate(data);
};

module.exports = {
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
};
