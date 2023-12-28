const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const orderControler = require("../controllers/orderController");

router.post("/createOrder", verifyAccessToken, orderControler.createOrder);
router.patch(
  "/confirmOrder/:id",
  verifyAccessToken,
  orderControler.confirmOrder
);
router.get("/getAllOrder", verifyAccessToken, orderControler.getAllOrder);
router.get("/getOrderUser", verifyAccessToken, orderControler.getOrderUser);
router.get("/getOrderId/:id", verifyAccessToken, orderControler.getOrderId);
module.exports = router;
