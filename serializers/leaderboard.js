const { Player } = require("../models");

async function leaderboardSeriaizer(winners) {
  const leaderboard = [];

  for (let index = 0; index < winners.length; index++) {
    const element = winners[index];
    const playerId = element.playerId;
    const player = await Player.findByPk(playerId);

    const playerName = player.playerName;
    const level = element.currentLevel;

    leaderboard.push({
      position: index + 1,
      player: playerName,
      levels: level,
    });
  }

  return {
    leaderboard: leaderboard,
  };
}

module.exports = leaderboardSeriaizer;
