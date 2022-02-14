const { Router } = require("express");
const router = Router();
const Controller = require("./controller");

router.post("/", Controller.createGuestSession);
router.post("/:id/play", Controller.PlaySession);

module.exports = router;
