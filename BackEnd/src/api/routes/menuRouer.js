const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const menuController = require("../controllers/menuController");
const { validMenu } = require("../middlewares/valid");
router.post(
  "/createMenu",
  verifyAccessToken,
  validMenu,
  menuController.createMenu
);
router.get("/getAllMenu", menuController.getAllMenu);
router.get("/getMenuId/:id", menuController.getIdMenu);
router.patch(
  "/updateMenu/:id",
  verifyAccessToken,
  validMenu,
  menuController.updateMenu
);
router.delete("/deleteMenu/:id", verifyAccessToken, menuController.deleteMenu);
module.exports = router;
