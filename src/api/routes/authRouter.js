const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/registerUser", authController.registerUser);
router.post("/registerUser/verifyOtp", authController.verifyOtp);
module.exports = router;
