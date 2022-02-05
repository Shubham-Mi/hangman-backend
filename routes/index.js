const { Router } = require("express");
const router = Router();
const SessionRouter = require("./sessions");

router.use("/sessions", SessionRouter);

module.exports = router;
