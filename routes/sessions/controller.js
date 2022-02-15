const sequelize = require("sequelize");
const { Word, SingleGame, GameSession } = require("../../models");
const { calculateDifficulty } = require("../../utilities/gameFunctions");
const serializeGameSession = require("../../serializers/gameSession");
const gameSessionServices = require("../../services/gameSessionServices");

async function CreateSession(req, res) {
  const playerId = req.body.id;
  const difficulty = await calculateDifficulty(1);
  const word = await Word.findOne({
    where: {
      difficulty: difficulty,
    },
    order: sequelize.fn("RANDOM"),
  });

  const newGameSession = await GameSession.create({
    currentLevel: 1,
    startedAt: new Date(),
    playerId: playerId,
  });

  const newGame = await SingleGame.create({
    playedLetters: "",
    wordId: word.id,
    startedAt: new Date(),
    gameSessionId: newGameSession.id,
  });

  res.json(await serializeGameSession(newGame));
}

async function PlayLetterInSingleGame(req, res) {
  const gameId = req.params.id;
  const letter = req.body.letter;

  const singlegame = await SingleGame.findByPk(gameId);

  await gameSessionServices.playLetterInGameSession(singlegame, letter);
  res.json(await serializeGameSession(singlegame));
}

async function NextLevel(req, res) {
  const gameId = req.params.id;
  const singlegame = await SingleGame.findByPk(gameId);
  const gameSessionId = singlegame.gameSessionId;
  const gameSession = await GameSession.findByPk(gameSessionId);

  const currentLevel = gameSession.currentLevel;
  const newLevel = currentLevel + 1;

  difficulty = await calculateDifficulty(newLevel);
  await gameSession.update({ currentLevel: newLevel });

  const word = await Word.findOne({
    where: {
      difficulty: difficulty,
    },
    order: sequelize.fn("RANDOM"),
  });

  const newGame = await SingleGame.create({
    playedLetters: "",
    wordId: word.id,
    startedAt: new Date(),
    gameSessionId: gameSession.id,
  });

  res.json(await serializeGameSession(newGame));
}

module.exports = {
  CreateSession,
  PlayLetterInSingleGame,
  NextLevel,
};
