const {
  calculateLivesLeft,
  calculateMaskedWord,
} = require("../utilities/gameFunctions");

async function gameSessionSerializer(GameSession) {
  const id = GameSession.id;
  const lives = await calculateLivesLeft(GameSession);
  const maskedWordArray = await calculateMaskedWord(GameSession);

  return {
    id: id,
    livesLeft: lives,
    result: !!GameSession.endedAt,
    maskedWord: maskedWordArray,
    playedLetters: GameSession.playedLetters,
  };
}

module.exports = gameSessionSerializer;
