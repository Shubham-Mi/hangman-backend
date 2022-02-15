const { calculateLivesLeft } = require("../utilities/guestGameFunctions");

async function markGameCompleted(GameSession) {
  const gameSessionWord = await GameSession.getWord();
  const actualWord = gameSessionWord.title;
  const playedLetters = GameSession.playedLetters.split("");
  const word_set = new Set([...actualWord]);
  const played_set = new Set([...playedLetters]);

  const isWon = [...word_set].reduce((acc, curr) => {
    if (!played_set.has(curr)) return false;
    return acc;
  }, true);

  const lives = await calculateLivesLeft(GameSession);

  if (lives === 0 || isWon) {
    GameSession.endedAt = new Date();
    await GameSession.save();
  }
}

async function playLetterInGameSession(GameSession, letter) {
  const playedLetters = GameSession.playedLetters.split("");
  const playedSet = new Set([...playedLetters]);

  if (playedSet.has(letter)) {
    return;
  }

  playedLetters.push(letter);
  GameSession.playedLetters = playedLetters.join("");
  await GameSession.save();
  await markGameCompleted(GameSession);
}

module.exports = {
  playLetterInGameSession,
};
