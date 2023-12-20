const createError = require("http-errors");

const http_errors = {
  badRequest: (err, res) => {
    const error = createError.BadRequest(err);
    
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },

  internalServerError: (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },

  notFound: (req, res) => {
    const error = createError.NotFound("This route is not defined");
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },
};
module.exports = http_errors;
