const authController = require("../controllers/authController");
const router = require("express").Router();
const { validAuth } = require("../middlewares/valid");
const { verifyAccessToken } = require("../middlewares/authenticate");
router.post("/registerUser", validAuth, authController.registerUser);
router.post("/registerUser/verifyOtp", authController.verifyOtp);
router.post("/login", validAuth, authController.login);
router.post("/refreshToken",authController.refreshToken);
router.get("/getUser", verifyAccessToken, (req, res, next) => {
  res.send("Hello big boss");
});
module.exports = router;
