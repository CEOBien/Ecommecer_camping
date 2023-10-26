const router = require("express").Router();
const { validGameCard } = require("../middlewares/valid");
const gameCardController = require("../controllers/gameCardController");
const uploadCloud = require("../../config/cloudinary");
router.post(
  "/createGameCard",
  uploadCloud.single("image"),
  validGameCard,
  gameCardController.createGameCard
);
router.get("/getAllGameCard", gameCardController.getAllGameCard);
router.get("/getGameCardId/:id", gameCardController.getGameCardId);
router.patch(
  "/updateGameCard/:id",
  uploadCloud.single("image"),
  gameCardController.updateGameCard
);
router.delete("/deleteGameCard/:id", gameCardController.deleteGameCard);

module.exports = router;
