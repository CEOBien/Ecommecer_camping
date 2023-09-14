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
    oldPassword: Joi.string()
    .required()
    .min(6)
    .max(30)
    .label("oldPassword"),
    newPassword: Joi.string()
    .required()
    .min(6)
    .max(30)
    .label("newPassword"),
  });

  return schema.validate(data);
};

module.exports = {
  registerUserValidate,
  changePasswordValidate,
};
