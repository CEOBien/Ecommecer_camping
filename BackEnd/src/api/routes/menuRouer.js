const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const menuController = require("../controllers/menuController");

router.post("/createMenu", verifyAccessToken, menuController.createMenu);
router.get("/getAllMenu", menuController.getAllMenu);
router.get("/getMenuId/:id", menuController.getIdMenu);
router.patch("/updateMenu/:id", menuController.updateMenu);
router.delete("/deleteMenu/:id", menuController.deleteMenu);
module.exports = router;
