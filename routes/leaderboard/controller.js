const sequelize = require("sequelize");
const { GameSession } = require("../../models");
const serializeLeaderboard = require("../../serializers/leaderboard");

async function findLeaderboard(req, res) {
  const winners = await GameSession.findAll({
    attributes: {
      include: [
        [
          sequelize.literal("(JULIANDAY(`endedAt`) - JULIANDAY(`startedAt`))"),
          "timeTaken",
        ],
      ],
    },
    order: [
      ["currentLevel", "DESC"],
      [sequelize.literal("timeTaken"), "ASC"],
    ],
    limit: 10,
  });

  res.json(await serializeLeaderboard(winners));
}

module.exports = {
  findLeaderboard,
};
