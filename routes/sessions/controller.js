const sequelize = require("sequelize");
const { Word, GameSession } = require("../../models");
const serializeGameSession = require("../../serializers/gameSession");
const gameSessionService = require("../../services/gameSessionServices");

async function CreateSession(req, res) {
  const name = req.body.name;
  const word = await Word.findOne({
    order: sequelize.fn("RANDOM"),
  });
  const gameSession = await GameSession.create({
    playerName: name,
    playedLetters: "",
    wordId: word.id,
    startedAt: new Date(),
  });

  res.json(await serializeGameSession(gameSession));
}

async function PlaySession(req, res) {
  const gameId = req.params.id;
  const letter = req.body.letter;
  const gameSession = await GameSession.findByPk(gameId);

  await gameSessionService.playLetterInGameSession(gameSession, letter);
  res.json(await serializeGameSession(gameSession));
}

module.exports = {
  CreateSession,
  PlaySession,
};
