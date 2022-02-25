const {
  calculateLivesLeft,
  calculateMaskedWord,
} = require("../utilities/guestGameFunctions");

async function guestGameSessionSerializer(guestGameSession) {
  const id = guestGameSession.id;
  const lives = await calculateLivesLeft(guestGameSession);
  const maskedWordArray = await calculateMaskedWord(guestGameSession);

  return {
    id: id,
    livesLeft: lives,
    result: !!guestGameSession.endedAt,
    maskedWord: maskedWordArray,
    playedLetters: guestGameSession.playedLetters,
  };
}

module.exports = guestGameSessionSerializer;
