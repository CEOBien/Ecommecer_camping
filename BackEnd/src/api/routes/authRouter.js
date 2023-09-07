const authController = require("../controllers/authController");
const router = require("express").Router();
const { validAuth } = require("../middlewares/valid");
router.post("/registerUser", validAuth, authController.registerUser);
router.post("/registerUser/verifyOtp", authController.verifyOtp);
router.post("/login", validAuth, authController.login);
module.exports = router;
