const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/orders",checkoutController.checkoutOrder);
router.get("/orders/:orderID/capture",checkoutController.orderCapture);

module.exports = router;
