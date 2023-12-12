const router = require("express").Router();
const { validGameCard } = require("../middlewares/valid");
const gameCardController = require("../controllers/gameCardController");
const uploadCloud = require("../../config/cloudinary");
const { verifyAccessToken } = require("../middlewares/authenticate");
router.post(
  "/createGameCard",
  verifyAccessToken,
  uploadCloud.single("image"),
  validGameCard,
  gameCardController.createGameCard
);
router.get("/getAllGameCard", gameCardController.getAllGameCard);
router.get("/getGameCardId/:id", gameCardController.getGameCardId);
router.patch(
  "/updateGameCard/:id",
  verifyAccessToken,
  uploadCloud.single("image"),
  gameCardController.updateGameCard
);
router.delete(
  "/deleteGameCard/:id",
  verifyAccessToken,
  gameCardController.deleteGameCard
);

module.exports = router;
