const { Router } = require("express");
const router = Router();
const SessionRouter = require("./sessions");
const AuthenticationRouter = require("./authentication");
const guestPlayRouter = require("./guestplay");
const leaderboardRouter = require("./leaderboard");

router.use("/sessions", SessionRouter);
router.use("/guestplay", guestPlayRouter);
router.use("/authentication", AuthenticationRouter);
router.use("/leaderboard", leaderboardRouter);

module.exports = router;
