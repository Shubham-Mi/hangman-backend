const sequelize = require("sequelize");
const { Word, GuestPlay } = require("../../models");
const serializeGuestGame = require("../../serializers/gameSession");
const gameSessionService = require("../../services/gameSessionServices");

async function createGuestSession(req, res) {
  const name = req.body.name;
  const word = await Word.findOne({
    order: sequelize.fn("RANDOM"),
  });
  const guestGameSession = await GuestPlay.create({
    playerName: name,
    playedLetters: "",
    wordId: word.id,
    startedAt: new Date(),
  });

  res.json(await serializeGuestGame(guestGameSession));
}

async function PlaySession(req, res) {
  const gameId = req.params.id;
  const letter = req.body.letter;
  const guestGameSession = await GuestPlay.findByPk(gameId);

  await gameSessionService.playLetterInGameSession(guestGameSession, letter);
  res.json(await serializeGuestGame(guestGameSession));
}

module.exports = {
  createGuestSession,
  PlaySession,
};
