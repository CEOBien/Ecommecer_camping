const router = require("express").Router();
const { validProfile } = require("../middlewares/valid");
const profileController = require("../controllers/profileController");
const uploadCloud = require("../../config/cloudinary");
const { verifyAccessToken } = require("../middlewares/authenticate");
router.post(
  "/createProfile",
  verifyAccessToken,
  uploadCloud.single("image"),
  validProfile,
  profileController.createProfile
);
router.get(
  "/getAllProfile",
  verifyAccessToken,
  profileController.getAllProfile
);
router.get(
  "/getProfileId/:id",
  verifyAccessToken,
  profileController.getProfileId
);
router.patch(
  "/updateProfile/:id",
  verifyAccessToken,
  uploadCloud.single("image"),
  profileController.updateProfile
);
router.delete(
  "/deleteProfile/:id",
  verifyAccessToken,
  profileController.deleteProfile
);

module.exports = router;
