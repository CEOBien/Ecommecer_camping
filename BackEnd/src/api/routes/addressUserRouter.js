const router = require("express").Router();
// const { verifyAccessToken } = require("../middlewares/authenticate");
const addressUserController = require("../controllers/addressUserController");
const { validAddressUser } = require("../middlewares/valid");
router.post(
  "/createAddressUser",
  validAddressUser,
  addressUserController.createAddressUser
);
router.get("/getAllAddressUser", addressUserController.getAllAddressUser);
router.get("/getAddressUserId/:id", addressUserController.getIdAddressUser);
router.patch(
  "/updateAddressUser/:id",
  validAddressUser,
  addressUserController.updateAddressUser
  
);
router.delete(
  "/deleteAddressUser/:id",
  addressUserController.deleteAddressUser
);
module.exports = router;
