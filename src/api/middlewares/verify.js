const createError = require("http-errors")
const jwt = require("jsonwebtoken")

module.exports.verifyRefreshToken = (req, res, next) => {
  try {
    const rf_token = req.cookies.refreshtoken
    if (!rf_token) throw createError.BadRequest("Please login now!")
    const decoded = jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
    if (!decoded?.id) throw createError.BadRequest("Please login now!")

    req.userId = decoded.id
    req.refreshtoken = rf_token
    next()
  } catch (error) {
    next(error)
  }
}
