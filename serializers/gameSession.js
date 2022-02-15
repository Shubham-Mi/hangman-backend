const {
  calculateLivesLeft,
  calculateMaskedWord,
} = require("../utilities/gameFunctions");

async function gameSessionSerializer(SingleGame) {
  const gameId = SingleGame.id;
  const lives = await calculateLivesLeft(SingleGame);
  const maskedWordArray = await calculateMaskedWord(SingleGame);

  return {
    gameId: gameId,
    livesLeft: lives,
    result: !!SingleGame.endedAt,
    maskedWord: maskedWordArray,
    playedLetters: SingleGame.playedLetters,
  };
}

module.exports = gameSessionSerializer;
