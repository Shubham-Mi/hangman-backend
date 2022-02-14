const { Router } = require("express");
const router = Router();
const SessionRouter = require("./sessions");
const AuthenticationRouter = require("./authentication");
const guestPlayRouter = require("./guestplay");

router.use("/sessions", SessionRouter);
router.use("/guestplay", guestPlayRouter);
router.use("/authentication", AuthenticationRouter);

module.exports = router;
