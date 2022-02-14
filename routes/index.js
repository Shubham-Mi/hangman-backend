const { Router } = require("express");
const router = Router();
const SessionRouter = require("./sessions");
const AuthenticationRouter = require("./authentication");

router.use("/sessions", SessionRouter);
router.use("/authentication", AuthenticationRouter);

module.exports = router;
