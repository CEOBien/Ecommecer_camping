const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const DiscountTypeController = require("../controllers/discountTypeController");
const { validDiscountType } = require("../middlewares/valid");

router.post(
  "/createDiscountType",
  verifyAccessToken,
  validDiscountType,
  DiscountTypeController.createDiscountType
);

router.get("/getAllDiscountType", DiscountTypeController.getAllDiscountType);
router.get("/getDiscountTypeId/:id", DiscountTypeController.getIdDiscountType);

router.patch(
  "/updateDiscountType/:id",
  verifyAccessToken,
  validDiscountType,
  DiscountTypeController.updateDiscountType
);

router.delete(
  "/deleteDiscountType/:id",
  verifyAccessToken,
  DiscountTypeController.deleteDiscountType
);

module.exports = router;
