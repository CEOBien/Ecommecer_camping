const router = require("express").Router();
const { validProfile } = require("../middlewares/valid");
const profileController = require("../controllers/profileController");
const uploadCloud = require("../../config/cloudinary");
router.post(
  "/createProfile",
  uploadCloud.single("image"),
  validProfile,
  profileController.createProfile
);
router.get("/getAllProfile", profileController.getAllProfile);
router.get("/getProfileId/:id", profileController.getProfileId);
router.patch(
  "/updateProfile/:id",
  uploadCloud.single("image"),
  profileController.updateProfile
);
router.delete("/deleteProfile/:id", profileController.deleteProfile);

module.exports = router;
