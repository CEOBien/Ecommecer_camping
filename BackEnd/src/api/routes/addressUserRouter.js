const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const addressUserController = require("../controllers/addressUserController");
const { validAddressUser } = require("../middlewares/valid");
router.post(
  "/createAddressUser",
  verifyAccessToken,
  validAddressUser,
  addressUserController.createAddressUser
);
router.get(
  "/getAllAddressUser",
  verifyAccessToken,
  addressUserController.getAllAddressUser
);
router.get(
  "/getAddressUserId/:id",
  verifyAccessToken,
  addressUserController.getIdAddressUser
);
router.patch(
  "/updateAddressUser/:id",
  verifyAccessToken,
  validAddressUser,
  addressUserController.updateAddressUser
);
router.delete(
  "/deleteAddressUser/:id",
  verifyAccessToken,
  addressUserController.deleteAddressUser
);
module.exports = router;
