import * as authController from "../controllers";
import express from "express";


const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);



module.exports = router;
