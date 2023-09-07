const Joi = require("joi");

const registerUserValidate = (data) => {
  const schema = Joi.object({
    EMAIL: Joi.email().required().label("EMAIL"),
    PASSWORD: Joi.string().required().label("PASSWORD"),
  });

  return schema.validate(data);
};

module.exports = {
  registerUserValidate,
};
