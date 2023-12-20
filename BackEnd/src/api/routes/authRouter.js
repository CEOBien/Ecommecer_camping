const authController = require("../controllers/authController");
const router = require("express").Router();
const { validAuth, validChangePassword } = require("../middlewares/valid");
const { verifyAccessToken } = require("../middlewares/authenticate");

router.post("/registerUser", validAuth, authController.registerUser);
router.post("/registerUser/verifyOtp", authController.verifyOtp);
router.post("/login", validAuth, authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", (verifyAccessToken, authController.logout));
router.patch(
  "/changePassword/:id",
  verifyAccessToken,
  validChangePassword,
  authController.changePassword
);
router.patch("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

module.exports = router;
