const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const RateProductController = require("../controllers/rateProductController");
router.post(
  "/createRateProduct",
  verifyAccessToken,
  RateProductController.createRateProduct
);
router.get(
  "/getAllRateProduct",
  verifyAccessToken,
  RateProductController.getAllRateProduct
);
router.get(
  "/getRateProductId/:id",
  verifyAccessToken,
  RateProductController.getIdRateProduct
);
router.post(
  "/avgRateProduct",
  verifyAccessToken,
  RateProductController.avgRate
);
router.patch(
  "/updateRateProduct/:id",
  verifyAccessToken,
  RateProductController.updateRateProduct
);
router.delete(
  "/deleteRateProduct/:id",
  verifyAccessToken,
  RateProductController.deleteRateProduct
);

module.exports = router;
