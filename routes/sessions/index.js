const { Router } = require("express");
const router = Router();
const Controller = require("./controller");

router.post("/", Controller.CreateSession);
router.post("/:id/play", Controller.PlayLetterInSingleGame);
router.post("/:id/nextLevel", Controller.NextLevel);

module.exports = router;
