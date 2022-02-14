const {
  calculateLivesLeft,
  calculateMaskedWord,
} = require("../utilities/gameFunctions");

async function guestGameSessionSerializer(guestGameSession) {
  const id = guestGameSession.id;
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

module.exports = guestGameSessionSerializer;
