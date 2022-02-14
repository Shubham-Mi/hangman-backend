const { Router } = require("express");
const router = Router();
const Controller = require("./controller");

router.post("/", Controller.createPlayer);
router.post("/authenticate", Controller.authenticate);

module.exports = router;
