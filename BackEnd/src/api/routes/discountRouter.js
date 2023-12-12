const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const DiscountController = require("../controllers/discountController");
const { validDiscount } = require("../middlewares/valid");

router.post(
  "/createDiscount",
  verifyAccessToken,
  validDiscount,
  DiscountController.createDiscount
);
router.get("/getAllDiscount", DiscountController.getAllDiscount);
router.get("/getDiscountId/:id", DiscountController.getIdDiscount);

router.patch(
  "/updateDiscount/:id",
  verifyAccessToken,
  validDiscount,
  DiscountController.updateDiscount
);

router.delete(
  "/deleteDiscount/:id",
  verifyAccessToken,
  DiscountController.deleteDiscount
);

module.exports = router;
