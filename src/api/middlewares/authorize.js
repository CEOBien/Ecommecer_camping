const jwt = require("jsonwebtoken")
const createError = require("http-errors")
const nonSecurePaths = ["/auth/login"];
const axios = require("axios");


exports.authorize = async (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) return next();
    const accessToken = req.header("Authorization")
    if (!accessToken) {
      return res.status(400).json({
        status: 400,
        message: "No authorization header found.",
      })
    }
    // Connect SSO server
    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.defaults.headers.common["Authorization"] = accessToken;
    const response = await axios.get(
      `${process.env.SSO_ORIGIN}/api/v1/auth/verifyServiceToken`
    );
    if (+response?.data?.status === 200) {
      return next()
    } else {
      return res.status(401).json({
        status: 401,
        message: "User not authorized from SSO server.",
      })
    }

    // const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    // if (!decoded) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Invalid Authentication",
    //   })
    // }

    // const user = await Users.findOne({
    //   where: { id: decoded.id },
    //   attributes: {
    //     exclude: ["USER_PW"],
    //   },
    // })
    // if (!user) throw createError.BadRequest("User does not exist.")
    // req.user = user

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: error.message,
      })
    }
    return res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
}
