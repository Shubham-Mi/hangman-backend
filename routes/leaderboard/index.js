const { Router } = require("express");
const router = Router();
const Controller = require("./controller");

router.post("/", Controller.findLeaderboard);

module.exports = router;
